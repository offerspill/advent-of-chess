import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Frontpage from './components/Frontpage';
import { client } from "./sanity";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
  const query = `*[_type == $type]`;


    useEffect(() => {
      const fetchPosts = () => {
        client
          .fetch(query, { type: 'post'})
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
        <Header />
        <Switch>
          <Route exact path="/">
            <Frontpage />
          </Route>
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
