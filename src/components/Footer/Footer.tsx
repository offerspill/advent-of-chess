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
          <a href="https://offerspill.com/" target="_blank" rel="noopener">
            <img src={offerspillLogo} />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://twitter.com/offerspill"
            target="_blank"
            rel="noopener"
          >
            <FaTwitter size={32} />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://facebook.com/offerspillsk"
            target="_blank"
            rel="noopener"
          >
            <FaFacebook size={32} />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://discord.gg/ekjjVscxNh"
            target="_blank"
            rel="noopener"
          >
            <FaDiscord size={32} />
          </a>
        </div>
        <div className="icon">
          <a
            href="https://github.com/offerspill/advent-of-chess"
            target="_blank"
            rel="noopener"
          >
            <FaGithub size={32} />
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
