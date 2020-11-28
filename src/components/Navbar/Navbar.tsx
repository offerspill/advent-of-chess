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
} from "./NavbarElements";

interface Props {
  toggle: () => void;
}

const Navbar = ({ toggle }: Props) => {
  const user = useContext(UserContext);

  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Logo</h1>
        </NavLink>
        <Bars onClick={toggle} />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign in</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
