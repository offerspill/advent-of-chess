import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import leaderboard from "../../files/leaderboard.json";
import {
  StyledLeaderboard,
  Info,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "./LeaderboardElements";

const Leaderboard = () => {
  return (
    <StyledLeaderboard>
      <h1>Leaderboard</h1>
      <Info>Last updated December 2nd, 14:35 UTC.</Info>
      <StyledTableContainer component={Paper}>
        <Table aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="center">Number of correct answers</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {leaderboard.map((user, i) => (
              <StyledTableRow key={user.username}>
                <TableCell>{i + 1}</TableCell>
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
