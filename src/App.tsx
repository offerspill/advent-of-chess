import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import Header from './components/Header';
import Windows from './components/Windows';

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
    <StyledApp>
      <Header/>
      <Windows/>
    </StyledApp>
  );
}

export default App;
