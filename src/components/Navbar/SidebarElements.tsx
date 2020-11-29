import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkR } from "react-router-dom";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;

  opacity: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "100%" : "0")};
  top: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "0" : "-100%")};

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const SignedInText = styled.div`
  color: white;
  text-align: center;
  font-size: 18px;
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
  display: block;
  position: absolute;
  top: 25px;
  right: 5px;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
  margin-top: 3rem;
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(16, 80px);
  text-align: center;
  padding: inherit;

  @media screen and (max-width: 768px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

export const SidebarLink = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-out;
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const SidebarSignIn = styled(LinkR)`
  border-radius: 50px;
  background: #256ce1;

  white-space: nowrap;
  padding: 16px 64px;
  color: #fff;

  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;

  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const SidebarLogOut = styled.div`
  position: absolute;
  border-radius: 50px;
  background: #ff3314;

  bottom: 50px;

  white-space: nowrap;
  padding: 16px 64px;
  color: #fff;

  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;

  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
