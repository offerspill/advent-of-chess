import React from "react";
import styled from "styled-components";
import Windows from "./Windows";
import logo from "../assets/logo.png";
import Logo from "./Logo";

const StyledLogo = styled.div`
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

const Frontpage = () => {
  return (
    <StyledLogo>
      <img src={logo} />
      <div className="by">By Offerspill</div>
    </StyledLogo>
  );
};

export default Frontpage;
