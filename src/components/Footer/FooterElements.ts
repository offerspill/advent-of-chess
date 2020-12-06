import styled from "styled-components";

export const StyledFooter = styled.footer`
  margin: 0 auto;
  background-color: #f2f2f2;

  height: 100px;

  position: absolute;
  bottom: 0;
  width: 100%;

  p {
    text-align: center;
    margin-top: 1rem;
    padding-right: 2rem;
    padding-left: 2rem;
    color: black;
  }

  @media screen and (max-width: 768px) {
    height: 410px;
    text-align: center;
  }
`;

export const StyledFooterIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  .sanityLogo {
    margin-bottom: 1px;
  }

  .icon {
    height: 32px;
    padding: 1rem;

    transition: all 0.1s ease-in-out;

    img {
      height: 32px;
    }

    .sanityLogo {
      height: 27px;
      margin-top: 4px;
    }

    a {
      color: black;
    }
  }

  .icon:hover {
    transform: scale(1.03);
  }
`;
