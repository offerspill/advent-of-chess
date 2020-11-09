import React from "react";
import styled from "styled-components";
import Windows from "./Windows";
import logo from "../assets/logo.png";

const StyledFrontpage = styled.div`
  padding: 20px;

  img {
    display: block;
    width: 300px;
    margin: 0 auto;
    margin-top: 40px;
  }

  .by {
    color: #0a3528;
    text-align: center;
    margin-top: 0.6rem;
  }
`;

interface FrontpageProps {
  posts: any;
}

const Frontpage = ({ posts }: FrontpageProps) => {
  const compare = (a: any, b: any) => {
    let aint = parseInt(a.day, 10);
    let bint = parseInt(b.day, 10);

    if (aint < bint) {
      return -1;
    }
    if (aint > bint) {
      return 1;
    }
    return 0;
  };

  const postsSorted = posts.sort(compare);

  return (
    <StyledFrontpage>
      <img src={logo} />
      <div className="by">By Offerspill</div>
      <Windows posts={posts} />
    </StyledFrontpage>
  );
};

export default Frontpage;
