import React from "react";
import styled from "styled-components";
import Windows from "./Windows";
import logo from "../assets/logo.png";
import Logo from "./Logo";

const StyledAbout = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  h1,
  h2,
  h3 {
    text-align: center;
  }
`;

const About = () => {
  return (
    <StyledAbout>
      <h1>About</h1>
    </StyledAbout>
  );
};

export default About;
