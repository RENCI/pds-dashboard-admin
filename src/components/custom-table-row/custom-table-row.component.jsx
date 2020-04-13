import React, { useState, useContext } from 'react';
import { ConfigContext } from '../../context/config-context';

import {
  TableCell,
  TableRow,
  Switch
} from "@material-ui/core";

const CustomTableRow = ({ plugin }) => {
  const {dispatch} = useContext(ConfigContext);
  const [enabled, setEnabled] = useState(plugin.enabled);
  const [expanded, setExpanded] = useState(false);

  const handleEnableToggle = () => {
    setEnabled(!enabled)
    dispatch({ type: "TOGGLE_ENABLED", payload: {piid: plugin.piid, enabled: !enabled} })
    console.table(plugin)
  }

  const handleExpandedToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <TableRow onClick={handleExpandedToggle}>
      <TableCell>
        <Switch
          checked={enabled}
          onChange={handleEnableToggle}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </TableCell>
      <TableCell>{plugin.piid}</TableCell>
      {plugin.pluginParameterDefaults ? <TableCell>{plugin.pluginParameterDefaults[0].parameterValue.value}</TableCell> : null}
      {plugin.pluginSelectors ? <TableCell>{plugin.pluginSelectors.filter(selector => selector.selectorValue).map(item => `${item.selectorValue.title} : ${item.selectorValue.value}`)}</TableCell> : null}
      {plugin.requiredPatientVariables ? <TableCell>{`${plugin.requiredPatientVariables[0].id} and ${plugin.requiredPatientVariables.length} others`}</TableCell> : null}
      {plugin.supportedPatientVariables ? <TableCell>{`${plugin.supportedPatientVariables[0].id} and ${plugin.supportedPatientVariables.length} others`}</TableCell> : null} 
      {plugin.title ? <TableCell>{plugin.title}</TableCell> : null}
    </TableRow>
  )
};

export default CustomTableRow;