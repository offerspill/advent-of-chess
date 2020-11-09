import React, { FC } from "react";
import styled from "styled-components";
const BlockContent = require("@sanity/block-content-to-react");

const StyledPost = styled.div`
  margin-top: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  h1.day {
    font-size: 60px;
    text-align: center;
  }

  .body {
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
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
        <BlockContent blocks={post.body} />
      </div>
    </StyledPost>
  );
};

export default Post;
