import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "blue",
    color: "#fff"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function Simpletable(props) {
  const classes = useStyles();

  let sellData = props.sellData;
  let maxSellcount;
  let maxSellItem;
  let minSellcount;
  let minSellItem;
  let TotalSellAmount = 0;

  if (props.sellData) {
    maxSellcount = Math.max.apply(
      Math,
      sellData.map(function (item) {
        return item.totalCount;
      })
    );

    maxSellItem = sellData.find(item => item.totalCount == maxSellcount);

    minSellcount = Math.min.apply(
      Math,
      sellData.map(function (item) {
        return item.totalCount;
      })
    );

    minSellItem = sellData.find(item => item.totalCount == minSellcount);

    const add = arr => arr.reduce((a, b) => a + b, 0);

    TotalSellAmount = sellData.map(item => item.total_selling_price * 1);

    var sum = add(TotalSellAmount);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">TOTAL SALE TILL DATE</StyledTableCell>
            <StyledTableCell align="center">HIGHEST SELLING PRODUCT</StyledTableCell>
            <StyledTableCell align="center">LOWEST SELLING PRODUCT</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="center">{sum ? sum : 0}</StyledTableCell>
            <StyledTableCell align="center">{maxSellItem ? maxSellItem.product_name : " Not Found"}</StyledTableCell>
            <StyledTableCell align="center">{minSellItem ? minSellItem.product_name : " Not Found"}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
