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
  NavBtnLink,
  SignedInText,
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
            <NavBtnLink to="/signin">Sign in</NavBtnLink>
          </NavBtn>
        ) : (
          <SignedInText>Signed in as {user.displayName}</SignedInText>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
