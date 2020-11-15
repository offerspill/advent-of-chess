import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Alert from "@material-ui/lab/Alert";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { CloseSharp } from "@material-ui/icons";
import { validateFEN } from "../utils/chessUtils";
import { UserContext } from "../providers/UserProvider";

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
  }

  figure {
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;

    img {
      border: 10px solid #0a3528;
      margin: 0 auto;
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

interface WindowProps {
  nr: string;
  posts: any;
}

const Post = ({ nr, posts }: WindowProps) => {
  const { handleSubmit, register, errors } = useForm();
  const user = useContext(UserContext);

  const post = posts.find((post: any) => post.day.toString(10) === nr);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

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
    margin-top: 3rem;
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
            />
          </StyledChessGround>
        );
      },
    },
  };

  const onSubmit = (formData: any) => {
    if (success) {
      setAlreadySubmitted(true);
      setOpenInfo(true);
      return;
    }

    if (!loading) {
      setSubmitError(false);
      setSuccess(false);
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
            setSuccess(true);
            setOpenSuccess(true);
          }
        })
        .catch((error) => {
          setSubmitError(true);
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
            {!user && (
              <p>
                Log in to appear on the Highscores, keep track of how many
                points you have, and to avoid writing your name and email
                everytime.
              </p>
            )}
            <div className="formElements">
              {!user && (
                <>
                  <TextField
                    className="textfield"
                    inputRef={register({
                      required: "Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                    name="email"
                    label="Email"
                    variant="filled"
                    error={errors.email}
                    helperText={errors.email && "Invalid email"}
                  />
                  <TextField
                    className="textfield"
                    inputRef={register({ required: "Required" })}
                    name="name"
                    label="Name"
                    variant="filled"
                    error={errors.name}
                    helperText={errors.name && "This field is required"}
                  />
                </>
              )}

              <TextField
                className="textfield"
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
              className={`button-submit ${success ? "buttonSuccess" : ""} ${
                submitError ? "buttonSubmitError" : ""
              }`}
              disabled={loading}
            >
              Submit
            </Button>
          </form>

          <div className="submitFeedback">
            {success && !alreadySubmitted && (
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
            {alreadySubmitted && (
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
                  You have already submitted an answer
                </Alert>
              </Collapse>
            )}
            {submitError && (
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
                  Oops! Something went wrong. Please try again or contact us if
                  the problem persists
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
