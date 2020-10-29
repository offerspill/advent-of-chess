import React from 'react';
import styled from 'styled-components';

const StyledWindows = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  background-color: #0a3528;

  width: 1320px;
  padding-top: 20px;
  padding-bottom: 20px;

  margin-top: 50px;
  margin-bottom: 50px;

  .window {
    height: 300px;
    width: 300px;
    background-color: white;
    text-align: center;
    font-size: 60px;

    box-sizing: border-box;

    margin: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .even {
    color: black;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;

    background-color: #f9f9f9;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }

  .odd {
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    color: #f9f9f9;

    background-color: #3AB99B;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }
`;

const Windows = () => {

    const windows = [...Array(24).keys()].map(key => key+1)
    ;

    const even = (n: number) => {
        return (n % 2 === 0); 
    }

  return (
    <StyledWindows>
      {windows.map((window: any, i: number) => {
          return <div className={`window ${even(i+1) ? 'even' : 'odd'}`}>
              {window}
          </div>
      })}
    </StyledWindows>
  );
}

export default Windows;
