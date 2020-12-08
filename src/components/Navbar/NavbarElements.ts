import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
  background: #fff;
  height: 120px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  z-index: 10;

  justify-content: flex-start;

  max-width: 1320px;

  @media (max-width: 1390px) {
    max-width: 1000px;
  }
`;

export const ExternalNavLink = styled.a`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;

  padding: 0 1rem;

  height: 100%;

  cursor: pointer;

  .external-link-icon {
    margin-left: 5px;
    margin-bottom: 3px;
    font-size: 15px;
  }
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;

  padding: 0 1rem;

  height: 100%;

  cursor: pointer;

  &.active {
    color: #3ab99b;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #000;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 25px;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  width: 100vw;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  justify-content: flex-end;
  width: 100vw;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LogOutWrapper = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  justify-content: flex-end;
  width: 100vw;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LogOutBtn = styled.div`
  border-radius: 4px;
  background: #ff3314;
  margin-left: 2rem;

  padding: 10px 22px;

  color: #fff;

  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const SignInBtn = styled(Link)`
  border-radius: 4px;
  background: #256ce1;

  padding: 10px 22px;

  color: #fff;

  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const SignedInText = styled.span`
  color: black;
  white-space: nowrap;
`;
