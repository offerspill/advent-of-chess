import React, { useContext } from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
  SidebarSignIn,
  SignedInText,
  SidebarLogOut,
  ContentWrapper,
} from "./SidebarElements";
import { auth } from "../../firebase/firebaseConfig";
import { UserContext } from "../../providers/UserProvider";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: Props) => {
  const user = useContext(UserContext);

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        {user && <SignedInText>Signed in as {user.displayName}</SignedInText>}
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggle}>
            Home
          </SidebarLink>
          <SidebarLink to="/about" onClick={toggle}>
            About
          </SidebarLink>
          <SidebarLink to="/leaderboard" onClick={toggle}>
            Leaderboard
          </SidebarLink>
          {user && (
            <SidebarLink to="/profile" onClick={toggle}>
              Profile
            </SidebarLink>
          )}
        </SidebarMenu>
        <SideBtnWrap>
          {!user ? (
            <SidebarSignIn to="signin">Sign In</SidebarSignIn>
          ) : (
            <SidebarLogOut
              onClick={() => {
                auth.signOut();
                toggle();
              }}
            >
              Log out
            </SidebarLogOut>
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
