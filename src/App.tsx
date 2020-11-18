import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Frontpage from "./components/Frontpage";
import { client } from "./sanity";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Post from "./components/Post";
import Logo from "./components/Logo";
import ScrollToTop from "./utils/ScrollToTop";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProvider from "./providers/UserProvider";
import ProfilePage from "./components/ProfilePage";
import PasswordReset from "./components/PasswordReset";

const StyledApp = styled.div`
  background-color: white;
`;

function App() {
  const [posts, setPosts] = useState([]);

  const day = 24;

  const query = `*[_type == $type  && day <= ${day.toString(
    10
  )}]{author, body, title, day}`;

  useEffect(() => {
    const fetchPosts = () => {
      client
        .fetch(query, { type: "advent_post" })
        .then((res: any) => {
          setPosts(res);
        })
        .catch((err: Error) => {
          console.log("err", err);
          console.error("Oh no, error occured: ", err);
        });
    };
    fetchPosts();
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <UserProvider>
        <Header />
        <StyledApp>
          <Logo />
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Frontpage posts={posts} />
            </Route>
            <Route
              path="/day/:nr"
              component={(props: any) => (
                <Post nr={props.match.params.nr} posts={posts} />
              )}
            />
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/reset">
              <PasswordReset />
            </Route>
          </Switch>
        </StyledApp>
      </UserProvider>
    </Router>
  );
}

export default App;
