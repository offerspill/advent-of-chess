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
  return (
    <StyledFrontpage>
      <Info>
        <Fade top cascade>
          <div>
            <h1>There won't be any</h1>
            <h1>Advent of Chess this year :(</h1>
            <h1>
              We're organizing <a href="https://monkasjakk.no">monkaSjakk</a>{" "}
              Dec 1.–14.
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
