import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
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
import Leaderboard from "./components/Leaderboard";
import About from "./components/About";
import Footer from "./components/Footer";
import Sidebar from "./components/Navbar/Sidebar";

const Container = styled.div`
  min-height: 100vh;
  position: relative;
`;

const Body = styled.div`
  background-color: white;
  padding-bottom: 200px;
  position: relative;

  @media screen and (max-width: 768px) {
    padding-bottom: 290px;
  }
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

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
        <Container>
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle} />
          <Body>
            <ScrollToTop />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Frontpage posts={posts} {...props} />}
              />
              <Route
                path="/day/:nr"
                component={(props: any) => (
                  <Post nr={props.match.params.nr} posts={posts} />
                )}
              />
              <Route exact path="/leaderboard">
                <Leaderboard />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Route exact path="/register">
                <SignUp />
              </Route>
              <Route exact path="/profile">
                <ProfilePage />
              </Route>
              <Route exact path="/reset">
                <PasswordReset />
              </Route>
            </Switch>
          </Body>
          <Footer />
        </Container>
      </UserProvider>
    </Router>
  );
}

export default App;
