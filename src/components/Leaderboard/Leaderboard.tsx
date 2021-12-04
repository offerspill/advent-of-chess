import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import highscores from "../../files/leaderboard.json";
import {
  StyledLeaderboard,
  Info,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "./LeaderboardElements";

const Leaderboard = () => {
  const leaderboard = highscores.leaderboard;
  const timestamp = highscores.updated;

  const sumPoints = leaderboard.reduce((s, user) => user.score + s, 0);

  return (
    <StyledLeaderboard>
      <h1>Leaderboard</h1>
      <h3>
        {sumPoints} problems solved by {leaderboard.length} users.
      </h3>
      <p>Last updated {timestamp}</p>
      <StyledTableContainer component={Paper}>
        <Table aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="center">Solved problems</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {leaderboard.map((user, i) => (
              <StyledTableRow key={user.username}>
                <TableCell>{user.pos}</TableCell>
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
