import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase/firebaseConfig";

const StyledAppBar = styled.div`
  flex-grow: 1;

  .menuButton {
    marin-right: 2rem;
  }

  .title {
    flex-grow: 1;
  }

  .logged-in-as {
    margin-right: 1.5rem;
  }

  .MuiToolbar-regular {
    display: flex;
    justify-content: space-between;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .user-info {
    display: flex;
  }
`;

const Header = () => {
  const user = useContext(UserContext);

  return (
    <StyledAppBar>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">Advent of Chess</Link>
          <div className="user-info">
            {user ? (
              <>
                <p className="logged-in-as">Logged in as {user.displayName}</p>
                <Button
                  color="inherit"
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </StyledAppBar>
  );
};

export default Header;
