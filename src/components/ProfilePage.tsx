import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";

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

const ProfilePage = () => {
  const user = useContext(UserContext);

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
    </StyledProfilePage>
  );
};

export default ProfilePage;
