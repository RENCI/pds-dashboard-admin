import React from 'react';
import {
  Typography,
  Paper,
} from "@material-ui/core";

import CustomTableHead from '../custom-table-head/custom-table-head.component';
import CustomTableRow from '../custom-table-row/custom-table-row.component';

const CustomTable = ({ plugins, title, tableHeaders, pluginKeys }) => {
  return (
    <>
      <Typography variant="h6" id="tableTitle">
        {title}
      </Typography>
      <Paper>
        <table>
          <CustomTableHead tableHeaders={tableHeaders}/>
          <tbody>
            {plugins.map(plugin => <CustomTableRow plugin={plugin} key={plugin.piid} pluginKeys={pluginKeys}/>)}
          </tbody>
        </table>
      </Paper>
    </>
  )
};

export default CustomTable;