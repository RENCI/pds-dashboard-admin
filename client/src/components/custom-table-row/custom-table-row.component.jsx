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
      {plugin.pluginParameterDefaults ? <TableCell>{plugin.pluginParameterDefaults[0].parameterValue.value}</TableCell> : null}
      {plugin.pluginSelectors ? <TableCell>{plugin.pluginSelectors.filter(selector => selector.selectorValue).map(item => `${item.selectorValue.title} : ${item.selectorValue.value}`)}</TableCell> : null}
      {plugin.requiredPatientVariables ? <TableCell>{`${plugin.requiredPatientVariables[0].id} and ${plugin.requiredPatientVariables.length} others`}</TableCell> : null}
      {plugin.supportedPatientVariables ? <TableCell>{`${plugin.supportedPatientVariables[0].id} and ${plugin.supportedPatientVariables.length} others`}</TableCell> : null} 
      {plugin.title ? <TableCell>{plugin.title}</TableCell> : null}
    </TableRow>
  )
};

export default CustomTableRow;