import React from "react";
import styled from "styled-components";
import Windows from "../Windows";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import {
  StyledFrontpage,
  Info,
  Square1,
  Square2,
  FaChessKingStyled,
} from "./FrontpageElements";

interface FrontpageProps {
  posts: any;
}

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const countdownRenderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: Countdown) => {
  if (completed) {
    return null;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const Frontpage = ({ posts, ...props }: FrontpageProps) => {
  const compare = (a: any, b: any) => {
    let aint = parseInt(a.day, 10);
    let bint = parseInt(b.day, 10);

    if (aint < bint) {
      return -1;
    }
    if (aint > bint) {
      return 1;
    }
    return 0;
  };

  const postsSorted = posts.sort(compare);

  return (
    <StyledFrontpage>
      <Info>
        <Fade top cascade>
          <div>
            <h1>Solve chess problems every day until Christmas.</h1>
            <h1>Win a chess board signed by Magnus Carlsen.</h1>
            <h1>
              The first puzzle will unlock on December 1st at midnight (UTC).
            </h1>
          </div>
        </Fade>
        <Zoom bottom cascade>
          <div>
            <Square1 />
          </div>
          <div>
            <Square2 />
          </div>
          <FaChessKingStyled />
        </Zoom>
        {/*<Fade>
          <h2>
            <Countdown date={Date.now() + 10000} renderer={countdownRenderer} />
          </h2>
        </Fade>*/}
      </Info>
      <Windows posts={posts} />
    </StyledFrontpage>
  );
};

export default Frontpage;
