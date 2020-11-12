import React from "react";
import styled from "styled-components";
import Windows from "./Windows";
import Logo from "./Logo";
import logo from "../assets/logo.png";

const StyledFrontpage = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
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
      <Windows posts={posts} />
    </StyledFrontpage>
  );
};

export default Frontpage;
