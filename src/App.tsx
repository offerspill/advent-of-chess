import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import Header from './components/Header';
import Windows from './components/Windows';
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
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <StyledApp>
      <Header/>
      <Switch>
        <Route exact path="/">
        <Windows/>
        </Route>
      </Switch>
    </StyledApp>
    </Router>
  );
}

export default App;
