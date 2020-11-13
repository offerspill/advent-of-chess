import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { CloseSharp } from "@material-ui/icons";
import validateFEN from "fen-validator";

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

const chessgroundStyle = {
  margin: "0 auto",
  marginTop: "4rem",
  marginBottom: "2rem",
};

interface WindowProps {
  nr: any;
  posts: any;
}

const serializers = {
  types: {
    code: (props: any) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    chessground: (props: any) => {
      if (!validateFEN(props.node.fen)) {
        return <h2>Illegal FEN string</h2>;
      }
      return (
        <Chessground
          orientation="white"
          drawable={{ enabled: false }}
          width="400px"
          height="400px"
          fen={props.node.fen}
          style={chessgroundStyle}
        />
      );
    },
  },
};

const url =
  "https://script.google.com/macros/s/AKfycbzSIv9kL_bfqLV2ncEwTc1GJl6CDounQD99hOtHvqN67hGhMjQ/exec";

const Post = ({ nr, posts }: WindowProps) => {
  const { handleSubmit, register, errors } = useForm();
  const post = posts.find((post: any) => post.day == nr);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  if (!post) return null;

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

      data.set("Email", formData.email);
      data.set("Name", formData.name);
      data.set("Day", nr);
      data.set("Answer", formData.answer);

      fetch(url, {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Submit answer</h2>

        <div className="formElements">
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

          {/*<TextField
            className="textfield"
            inputRef={register}
            name="displayName"
            label="Display name"
            variant="filled"
            helperText="Optional. Only needed if you want your name on the highscores."
          />*/}

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

        {loading && <CircularProgress size={24} className="buttonProgress" />}

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
              Oops! Something went wrong. Please try again or contact us if the
              problem persists
            </Alert>
          </Collapse>
        )}
      </div>
    </StyledPost>
  );
};

export default Post;
