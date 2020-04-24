import React, { useState, useContext } from 'react';
import { ConfigContext } from '../../context/config-context';

import {
  Switch
} from "@material-ui/core";

const CustomTableSwitch = ({ enabled, piid }) => {
  const { dispatch } = useContext(ConfigContext);
  const [enabledState, setEnabledState] = useState(enabled);

  const handleEnableToggle = () => {
    setEnabledState(!enabled)
    dispatch({ type: "TOGGLE_ENABLED", payload: { piid: piid, enabled: !enabled } })
  }

  return (
    <Switch
      checked={enabledState}
      onChange={handleEnableToggle}
      name="checkedA"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  )
};

export default CustomTableSwitch;