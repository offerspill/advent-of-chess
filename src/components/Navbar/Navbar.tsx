import React, { useContext, CSSProperties } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../providers/UserProvider";
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
} from "./NavbarElements";
import logo from "../../assets/logo.png";

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
    </>
  );
};

export default Navbar;
