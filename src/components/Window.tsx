import React, { FC } from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f8f9fa;
`;

interface WindowProps {
  nr: any;
  posts: any;
}

const Window = ({ nr, posts }: WindowProps) => {
  return <h1>Halla {nr}</h1>;
};

export default Window;
