import React, { FC } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
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
`;

interface WindowProps {
  nr: any;
  posts: any;
}

const url =
  "https://script.google.com/macros/s/AKfycbzSIv9kL_bfqLV2ncEwTc1GJl6CDounQD99hOtHvqN67hGhMjQ/exec";

const Post = ({ nr, posts }: WindowProps) => {
  const { register, handleSubmit } = useForm();
  const post = posts.find((post: any) => post.day == nr);

  if (!post) return null;

  console.log(post);

  const onSubmit = (formData: any) => {
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
          console.log("YEP");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <label>Email</label>
        <input ref={register} name="email" />

        <label>Name</label>
        <input ref={register} name="name" />

        <label>Answer</label>
        <textarea ref={register} name="answer" />

        <button>Submit</button>
      </form>
    </StyledPost>
  );
};

export default Post;
