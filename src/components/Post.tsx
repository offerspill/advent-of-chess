import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Alert from "@material-ui/lab/Alert";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { CloseSharp } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import { validateFEN } from "../utils/chessUtils";
import { UserContext } from "../providers/UserProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router-dom";
import broken from "../assets/broken.png";

const BlockContent = require("@sanity/block-content-to-react");

const StyledPost = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  h1.day {
    font-size: 60px;
    text-align: center;
    color: #0a3528;
  }

  .body {
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
    font-weight: 300;

    .icons {
      margin-bottom: 3rem;

      img {
        margin-right: 2rem;
        transition: all 0.1s ease-in-out;
      }

      img:hover {
        transform: scale(1.1);
      }
    }
  }

  figure {
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;

    img {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
    }
  }

  form {
    margin: 0 auto;
    margin-top: 5rem;
    max-width: 600px;

    h1,
    h2,
    h3 {
      text-align: center;
    }

    .formElements {
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: center;

      .textfield {
        margin-bottom: 2rem;
      }
    }

    button {
      display: block;
      margin: 0 auto;
    }

    .buttonSuccess {
      background-color: #4baf51;
    }

    .buttonSubmitError {
      background-color: #ff7561;
    }

    .buttonProgress {
      display: block;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }

  .submitFeedback {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 2rem;
  }
`;

const StyledClosedSubmissions = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 4rem;
  text-align: center;
`;

const tooltipStyles = makeStyles((theme) => ({
  arrow: {
    color: "#000",
  },
  tooltip: {
    backgroundColor: "#000",
  },
}));

interface WindowProps {
  nr: string;
  posts: any;
}

const Post = ({ nr, posts }: WindowProps) => {
  const { handleSubmit, register, errors } = useForm();
  const user = useContext(UserContext);

  const post = posts.find((post: any) => post.day.toString(10) === nr);

  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [boardSize, setBoardSize] = useState(600);

  const date = new Date(2020, 11, parseInt("13", 10), 2, 20, 0).getTime();
  const currDate = new Date().getTime();

  const diff = currDate - date;

  const openSubmission = diff < 86400000;

  useEffect(() => {
    let bodyWidth = document.body.clientWidth - 100;
    if (bodyWidth > 600) bodyWidth = 600;

    setBoardSize(bodyWidth);
  }, []);

  if (!post) return null;

  const StyledChessGround = styled.div`
    margin: 0 auto;
    margin-top: 1.5rem;
    margin-bottom: 3rem;
    width: ${boardSize}px;
  `;

  const serializers = {
    types: {
      code: (props: any) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
      chessground: (props: any) => {
        const orientation = props.node.orientation
          ? props.node.orientation
          : "white";

        if (!validateFEN(props.node.fen)) {
          return <h2>Illegal FEN string</h2>;
        }

        return (
          <StyledChessGround>
            <Chessground
              orientation={orientation}
              drawable={{ enabled: false }}
              width={`${boardSize}px`}
              height={`${boardSize}px`}
              fen={props.node.fen}
              viewOnly={true}
              coordinates={!props.node.coordinates}
            />
          </StyledChessGround>
        );
      },
    },
  };

  const onSubmit = (formData: any) => {
    setInfo("");
    setOpenInfo(false);

    if (user && user.uid) {
      if (!user.emailVerified) {
        setError("You haven't verified your email.");
        setOpenError(true);
        return;
      }

      const alreadyPosted = reactLocalStorage.get(user.uid + nr);

      if (alreadyPosted) {
        setInfo("You have already submitted an answer to this question.");
        setOpenInfo(true);
        return;
      }
    } else {
      const alreadyPosted = reactLocalStorage.get(formData.email + nr);

      if (alreadyPosted) {
        setInfo("You have already submitted an answer to this question.");
        setOpenInfo(true);
        return;
      }
    }

    if (!loading) {
      setError("");
      setLoading(true);

      const data = new FormData();

      if (user?.email && user?.displayName) {
        data.set("Email", user.email);
        data.set("Username", user.displayName);
      } else {
        data.set("Email", formData.email);
        data.set("Name", formData.name);
      }

      data.set("Day", nr);
      data.set("Answer", formData.answer);

      const submitUrl = process.env.REACT_APP_SHEETS;

      fetch(submitUrl, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            setOpenSuccess(true);

            if (user && user.uid) {
              reactLocalStorage.set(user.uid + nr, true);
            } else {
              reactLocalStorage.set(formData.email + nr, true);
            }
          }
        })
        .catch((err) => {
          setError(err.message);
          setOpenError(true);
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <StyledPost>
      <h1 className="day">{post.day}</h1>
      <div className="body">
        <div className="icons">
          <Tooltip arrow title="Selfmate" classes={tooltipStyles()}>
            <img src={broken} width="64px" />
          </Tooltip>
          <img src={broken} width="64px" />
          <img src={broken} width="64px" />
        </div>
        <BlockContent
          blocks={post.body}
          imageOptions={{ w: 550 }}
          projectId="l3m1tz9l"
          dataset="production"
          serializers={serializers}
        />
      </div>
      {openSubmission ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Submit answer</h2>
            {user ? (
              <>
                {" "}
                <p>
                  You won't be able to change your answer once you've submitted
                  it.
                </p>
                <div className="formElements">
                  <TextField
                    className="textfield"
                    multiline
                    rows={4}
                    inputRef={register({ required: "Required" })}
                    name="answer"
                    label="Answer"
                    variant="filled"
                    error={errors.answer}
                    helperText={errors.answer && "This field is required"}
                  />
                </div>
                {loading && (
                  <CircularProgress size={24} className="buttonProgress" />
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={`button-submit ${info ? "buttonSuccess" : ""} ${
                    error ? "buttonSubmitError" : ""
                  }`}
                  disabled={loading}
                >
                  Submit
                </Button>
              </>
            ) : (
              <h3>
                You need to <Link to="/signin">sign in</Link> to submit an
                answer.
              </h3>
            )}
          </form>

          <div className="submitFeedback">
            {!info && (
              <Collapse in={openSuccess}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenSuccess(false);
                      }}
                    >
                      <CloseSharp fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Your answer has been submitted!
                </Alert>
              </Collapse>
            )}
            {info && (
              <Collapse in={openInfo}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenInfo(false);
                      }}
                    >
                      <CloseSharp fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {info}
                </Alert>
              </Collapse>
            )}
            {error && (
              <Collapse in={openError}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenError(false);
                      }}
                    >
                      <CloseSharp fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              </Collapse>
            )}
          </div>
        </>
      ) : (
        <StyledClosedSubmissions>
          <h2>Closed</h2>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Show solution
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </StyledClosedSubmissions>
      )}
    </StyledPost>
  );
};

export default Post;
