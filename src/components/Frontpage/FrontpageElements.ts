import styled from "styled-components";
import { FaChessKing } from "react-icons/fa";

export const StyledFrontpage = styled.div`
  position: relative;
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
    max-width: 360px;
  }

  margin: 0 auto;
`;

export const Info = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 480px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const Square1 = styled.div`
  position: absolute;

  top: 80px;
  right: 300px;

  width: 100px;
  height: 100px;
  background: #000;

  transform: rotateZ(45deg);

  @media (max-width: 1390px) {
    right: 30px;
    width: 80px;
    height: 80px;
  }

  @media (max-width: 1075px) {
    display: none;
  }
`;

export const Square2 = styled.div`
  position: absolute;

  top: 80px;
  right: 440px;

  width: 100px;
  height: 100px;
  background: #000;

  transform: rotateZ(45deg);

  @media (max-width: 1390px) {
    right: 140px;
    width: 80px;
    height: 80px;
  }

  @media (max-width: 1075px) {
    display: none;
  }
`;

export const FaChessKingStyled = styled(FaChessKing)`
  position: absolute;

  top: 80px;
  right: 320px;

  width: 100px;
  height: 100px;
  color: #fff;

  @media (max-width: 1390px) {
    right: 40px;
    width: 80px;
    height: 80px;
  }

  @media (max-width: 1075px) {
    display: none;
  }
`;
