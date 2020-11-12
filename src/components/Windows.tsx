import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledWindows = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  background-color: #0a3528;

  width: 1320px;
  padding-top: 20px;
  padding-bottom: 20px;

  margin-top: 20px;
  margin-bottom: 50px;

  @media (max-width: 800px) {
    flex-direction: column;
  }

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
    color: #0a3528;
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

    background-color: #3ab99b;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    -moz-transition: 0.5s;
    -webkit-transition: 0.5s;
    transition: 0.5s;
  }

  .closed {
    background-color: grey;
    color: #ababab;
  }

  .disabled {
    background-color: #7a8c88;
    color: #303836;
  }

  a.link-window {
    text-decoration: none;
  }

  a.link-window:hover {
    transform: scale(1.02);
  }

  a.link-window:active {
    transform: scale(0.98);
  }
`;

interface WindowsProps {
  posts: any;
}

const Windows = ({ posts }: WindowsProps) => {
  const windows = [...Array(24).keys()].map((key) => key + 1);

  const even = (n: number) => {
    return n % 2 === 0;
  };

  return (
    <StyledWindows>
      {windows.map((window: any, i: number) => {
        const post = posts[i];

        if (post) {
          return (
            <Link className="link-window" to={"/day/" + post.day}>
              <div className={`window ${even(i + 1) ? "even" : "odd"}`}>
                {window}
              </div>
            </Link>
          );
        } else {
          return (
            <div className={`window ${even(i + 1) ? "even" : "odd"} disabled`}>
              {window}
            </div>
          );
        }
      })}
    </StyledWindows>
  );
};

export default Windows;
