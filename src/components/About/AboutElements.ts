import styled from "styled-components";

export const StyledAbout = styled.div`
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

  figure {
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;

    img {
      margin: 0 auto;
      width: 100%;
      max-width: 680px;
    }
  }

  max-width: 680px;

  @media (max-width: 800px) {
    max-width: 360px;
  }
`;
