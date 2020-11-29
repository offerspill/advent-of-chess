import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export const StyledLeaderboard = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  h1 {
    text-align: center;
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  max-width: 680px;
  margin: 0 auto;

  background-color: #3ab99b;
`;

export const StyledTableHead = styled(TableHead)`
  tr {
    background-color: #3ab99b;
    color: white;
  }

  th {
    font-weight: bold;
  }
`;

export const Info = styled.p`
  margin: 0 auto;
  max-width: 680px;
  margin-bottom: 1rem;
`;

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F5F5",
    },
  },
}))(TableRow);
