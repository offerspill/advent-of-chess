import React from "react";
import styled from "styled-components";
import Windows from "./Windows";
import Fade from "react-reveal/Fade";
import Countdown from "react-countdown";

const StyledFrontpage = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;

  max-width: 1320px;

  @media (max-width: 1390px) {
    max-width: 1000px;
  }

  @media (max-width: 1075px) {
    max-width: 680px;
  }

  @media (max-width: 800px) {
    width: 360px;
  }

  margin: 0 auto;
`;

const Info = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

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

const Frontpage = ({ posts }: FrontpageProps) => {
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
            <h1>Solve chess puzzles every day in December.</h1>
            <h1>Win a chess board signed by World Champion Magnus Carlsen.</h1>
            <h1>
              The first puzzle will unlock on December 1st at midnight (UTC).
            </h1>
          </div>
        </Fade>
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
