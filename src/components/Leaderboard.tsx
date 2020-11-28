import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import { CloseSharp } from "@material-ui/icons";
import { auth } from "../firebase/firebaseConfig";
import { UserContext } from "../providers/UserProvider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import leaderboard from "../files/leaderboard.json";

const StyledLeaderboard = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  h1 {
    text-align: center;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  max-width: 680px;
  margin: 0 auto;

  background-color: #3ab99b;
`;

const StyledTableHead = styled(TableHead)`
  tr {
    background-color: #3ab99b;
    color: white;
  }

  th {
    font-weight: bold;
  }
`;

const Info = styled.p`
  margin: 0 auto;
  max-width: 680px;
  margin-bottom: 1rem;
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F5F5",
    },
  },
}))(TableRow);

const Leaderboard = () => {
  return (
    <StyledLeaderboard>
      <h1>Leaderboard</h1>
      <Info>Last updated December 2nd, 14:35 UTC.</Info>
      <StyledTableContainer component={Paper}>
        <Table aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="center">Number of correct answers</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {leaderboard.map((user) => (
              <StyledTableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell align="center">{user.score}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledLeaderboard>
  );
};
export default Leaderboard;
