import React from "react";
import offerspillLogo from "../../assets/offerspill-logo.png";
import sanityLogo from "../../assets/sanity-logo.png";
import { FaTwitter, FaFacebook, FaGithub, FaDiscord } from "react-icons/fa";
import { StyledFooter, StyledFooterIcons } from "./FooterElements";

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterIcons>
        <div className="icon">
          <a href="https://offerspill.com/" target="_blank" rel="noreferrer">
            <img src={offerspillLogo} alt="Offerspill-logo" />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://twitter.com/offerspill"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter size={32} />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://facebook.com/offerspillsk"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook size={32} />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://discord.gg/ekjjVscxNh"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord size={32} />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://github.com/offerspill/advent-of-chess"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={32} />
          </a>
        </div>
        <div className="icon">
          <a href="https://sanity.io" target="_blank" rel="noreferrer">
            <img className="sanityLogo" src={sanityLogo} />
          </a>
        </div>
      </StyledFooterIcons>
    </StyledFooter>
  );
};

export default Footer;
