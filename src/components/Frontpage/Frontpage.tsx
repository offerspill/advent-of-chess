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
            <h1>Advent of Chess 2021 is over!</h1>
            <h1>Thanks to everyone who participated!</h1>
            <h1>
              Join our{" "}
              <a
                href="https://discord.gg/7GjpcUzG2w"
                target="_blank"
                rel="noreferrer"
              >
                Discord server
              </a>{" "}
              for updates on who won
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
