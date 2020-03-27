import React from 'react';

import {
  TableCell,
  TableRow,
  Switch
} from "@material-ui/core";

const CustomTableRow = ({ plugin }) => {
  return (
    <TableRow>
      <TableCell>
        <Switch
          checked={plugin.enabled}
          // onChange={handleChange}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </TableCell>
      <TableCell>{plugin.piid}</TableCell>
      <TableCell>{plugin.version}</TableCell>
      <TableCell>{plugin.pluginParameterDefaults[0].parameterValue.value}</TableCell>
      <TableCell>{plugin.pluginSelectors[0].selectorValue.title}, {plugin.pluginSelectors[0].selectorValue.value}</TableCell>
      <TableCell>{plugin.requiredPatientVariables.map(variable => variable.id)}</TableCell>
      <TableCell>{plugin.title}</TableCell>
    </TableRow>
  )
}
export default CustomTableRow;