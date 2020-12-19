import React, { useContext, CSSProperties } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../providers/UserProvider";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import { auth } from "../../firebase/firebaseConfig";
import {
  Nav,
  Bars,
  NavMenu,
  NavLink,
  NavBtn,
  SignInBtn,
  SignedInText,
  LogOutBtn,
  LogOutWrapper,
  ExternalNavLink,
} from "./NavbarElements";
import logo from "../../assets/logo.png";
import { FiExternalLink } from "react-icons/fi";

interface Props {
  toggle: () => void;
}

const Navbar = ({ toggle }: Props) => {
  const user = useContext(UserContext);

  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={logo} width={100} />
        </NavLink>
        <Bars onClick={toggle} />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          {user && <NavLink to="/profile">Profile</NavLink>}
          {/*<ExternalNavLink
            href="https://discord.gg/ekjjVscxNh"
            target="_blank"
            rel="noopener"
          >
            Discord
            <FiExternalLink className="external-link-icon" />
          </ExternalNavLink>*/}
        </NavMenu>
        {!user ? (
          <NavBtn>
            <SignInBtn to="/signin">Sign in</SignInBtn>
          </NavBtn>
        ) : (
          <>
            <LogOutWrapper>
              <SignedInText>Signed in as {user.displayName}</SignedInText>
              <LogOutBtn
                onClick={() => {
                  auth.signOut();
                }}
              >
                Log out
              </LogOutBtn>
            </LogOutWrapper>
          </>
        )}
      </Nav>
      {user && !user.emailVerified && (
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
            ></IconButton>
          }
        >
          You need to verify your email ({user.email}) before submitting
          answers.
        </Alert>
      )}
    </>
  );
};

export default Navbar;
