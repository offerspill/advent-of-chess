import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Frontpage from "./components/Frontpage";
import { client } from "./sanity";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Post from "./components/Post";
import Logo from "./components/Logo";

const StyledApp = styled.div`
  background-color: white;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
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
        .fetch(query, { type: "post" })
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

  console.log(posts);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StyledApp>
        <Logo />
        <Switch>
          <Route exact path="/">
            <Frontpage posts={posts} />
          </Route>
          <Route
            path="/window/:nr"
            component={(props: any) => (
              <Post nr={props.match.params.nr} posts={posts} />
            )}
          />
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
