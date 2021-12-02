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
import { validateFEN } from "../../utils/chessUtils";
import { UserContext } from "../../providers/UserProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router-dom";
import { StyledPost, StyledClosedSubmissions, Styled404 } from "./PostElements";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

const BlockContent = require("@sanity/block-content-to-react");

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

  useEffect(() => {
    let bodyWidth = document.body.clientWidth - 100;
    if (bodyWidth > 600) bodyWidth = 600;

    setBoardSize(bodyWidth);
  }, []);

  if (!post) return <Styled404>404</Styled404>;

  const currentDate = new Date().getUTCDate();

  const openSubmission = currentDate === post.day;

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
        setError(
          "You haven't verified your email. If you just did, refresh and try again."
        );
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
        data.set("Email", user.email);
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

  const dataset =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SANITY_DATASET_PROD
      : process.env.REACT_APP_SANITY_DATASET_LOCAL;

  return (
    <StyledPost>
      <h1 className="day">{post.day}</h1>
      <div className="body">
        <BlockContent
          blocks={post.body}
          imageOptions={{ w: 550 }}
          projectId={process.env.REACT_APP_SANITY_ID}
          dataset={dataset}
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
              <strong>Show solution</strong>
            </AccordionSummary>
            <AccordionDetails>
              {post.answer ? (
                <BlockContent
                  blocks={post.answer}
                  imageOptions={{ w: 550 }}
                  serializers={serializers}
                />
              ) : (
                <p>The solution will appear here soon!</p>
              )}
            </AccordionDetails>
          </Accordion>
        </StyledClosedSubmissions>
      )}
    </StyledPost>
  );
};

export default Post;
