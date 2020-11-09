import React, { FC } from "react";
import styled from "styled-components";
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

const Post = ({ nr, posts }: WindowProps) => {
  console.log(posts);
  const post = posts.find((post: any) => post.day == nr);

  if (!post) return null;

  console.log(post);

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
    </StyledPost>
  );
};

export default Post;
