import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import offerspillLogo from "../assets/offerspill-logo.png";
import sanityLogo from "../assets/sanity-logo.png";

const StyledFooter = styled.footer`
  margin: 0 auto;
  background-color: #0a3528;
  padding-top: 1rem;
  padding-bottom: 1rem;

  p {
    text-align: center;
    margin-top: 1rem;
    padding-right: 2rem;
    padding-left: 2rem;
    color: white;
  }

  hr {
    border: none;
    height: 2px;
    /* Set the hr color */
    color: #0a3528; /* old IE */
    background-color: #0a3528; /* Modern Browsers */
  }
`;

const StyledFooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .sanityLogo {
    margin-bottom: 1px;
  }

  .icon {
    height: 32px;
    padding: 1rem;

    img {
      height: 32px;
    }

    .sanityLogo {
      height: 27px;
      margin-top: 4px;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>Footer blablbla</p>
      {/*<StyledFooterIcons>
        <div className="icon">
          <a href="https://offerspill.com/" target="_blank">
            <img src={offerspillLogo} />
          </a>
        </div>
        <div className="icon">
          <a href="https://sanity.io" target="_blank">
            <img className="sanityLogo" src={sanityLogo} />
          </a>
        </div>
      </StyledFooterIcons>*/}
    </StyledFooter>
  );
};

export default Footer;
