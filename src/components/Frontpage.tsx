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
`;

const Frontpage = () => {
  return (
    <StyledFrontpage>
      <img src={logo} />
      <Windows />
    </StyledFrontpage>
  );
};

export default Frontpage;
