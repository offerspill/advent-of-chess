import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import offerspillLogo from "../assets/offerspill-logo.png";
import sanityLogo from "../assets/sanity-logo.png";

const StyledFooter = styled.footer`
  margin: 0 auto;
  background-color: #f2f2f2;

  height: 100px;
  position: absolute;
  bottom: 0;
  width: 100%;

  p {
    text-align: center;
    margin-top: 1rem;
    padding-right: 2rem;
    padding-left: 2rem;
    color: black;
  }
`;

const StyledFooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;

  .sanityLogo {
    margin-bottom: 1px;
  }

  .icon {
    height: 32px;
    padding: 1rem;

    transition: all 0.1s ease-in-out;

    img {
      height: 32px;
    }

    .sanityLogo {
      height: 27px;
      margin-top: 4px;
    }
  }

  .icon:hover {
    transform: scale(1.03);
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterIcons>
        <div className="icon">
          <a href="https://offerspill.com/" target="_blank" rel="noopener">
            <img src={offerspillLogo} />
          </a>
        </div>
        <div className="icon">
          <a href="https://sanity.io" target="_blank" rel="noopener">
            <img className="sanityLogo" src={sanityLogo} />
          </a>
        </div>
      </StyledFooterIcons>
    </StyledFooter>
  );
};

export default Footer;
