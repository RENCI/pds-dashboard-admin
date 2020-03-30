import React from 'react';

import {
  TableCell,
  TableRow,
  TableHead
} from "@material-ui/core";

const CustomTableHead = ({ tableHeaders }) => {
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map(header => <TableCell key={header}>{header}</TableCell>)}
      </TableRow>
    </TableHead>
  )
};

export default CustomTableHead;