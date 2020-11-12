import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Input, Button, TextField } from "@material-ui/core";
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

    .buttonProgress {
      display: block;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
`;

interface WindowProps {
  nr: any;
  posts: any;
}

const url =
  "https://script.google.com/macros/s/AKfycbzSIv9kL_bfqLV2ncEwTc1GJl6CDounQD99hOtHvqN67hGhMjQ/exec";

const Post = ({ nr, posts }: WindowProps) => {
  const { handleSubmit, register, errors } = useForm();
  const post = posts.find((post: any) => post.day == nr);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const timer = useRef();

  if (!post) return null;

  console.log(post);

  const onSubmit = (formData: any) => {
    if (success) {
      setAlreadySubmitted(true);
      return;
    }

    if (!loading) {
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
          }
        })
        .catch((error) => {
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
          className={`button-submit ${success ? "buttonSuccess" : ""}`}
          disabled={loading}
        >
          Submit
        </Button>
        {alreadySubmitted && <h2>You have already submitted an answer.</h2>}
      </form>
    </StyledPost>
  );
};

export default Post;
