import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";
import user_scores from "../files/user_scores.json";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const StyledProfilePage = styled.div`
  margin: 0 auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  font-weight: 300;
  font-size: 18px;
  line-height: 1.5;

  h1,
  h2,
  h3 {
    text-align: center;
  }

  h2,
  h3 {
    margin-top: 3rem;
  }

  max-width: 680px;

  @media (max-width: 800px) {
    max-width: 360px;
  }
`;

const UserScores = styled.div`
  display: flex;

  .score {
    margin-left: 1rem;

    svg {
      margin-top: 3px;
    }

    .correct {
      color: green;
    }

    .wrong {
      color: red;
    }
  }
`;

const ProfilePage = () => {
  const user = useContext(UserContext);

  if (!user) return null;

  const scores = user_scores[user.displayName];

  return (
    <StyledProfilePage>
      <h1>Profile</h1>
      {user ? (
        <>
          <div>Username: {user.displayName}</div>
          <div>Email: {user.email}</div>
        </>
      ) : (
        <div>Not logged in.</div>
      )}
      <h1>Scores</h1>
      {scores ? (
        scores.map((score) => {
          return (
            <UserScores>
              <div className="day">Day {score.day}:</div>
              <div className="score">
                {score.score === 1 ? (
                  <FaCheck className="correct" />
                ) : (
                  <ImCross className="wrong" />
                )}
              </div>
            </UserScores>
          );
        })
      ) : (
        <h2>No submitted answers</h2>
      )}
    </StyledProfilePage>
  );
};

export default ProfilePage;
