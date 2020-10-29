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
      color: #0A3528;
      text-align: center;
      margin-top: 0.6rem;
  }
`;

const Frontpage = () => {
  return (
    <StyledFrontpage>
      <img src={logo} />
      <div className="by">By Offerspill</div>
      <Windows />
    </StyledFrontpage>
  );
};

export default Frontpage;
