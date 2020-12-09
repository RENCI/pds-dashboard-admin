import React, { useContext } from "react";
import { Switch } from "@material-ui/core";
import { ConfigContext } from "../../context/config-context";

const CustomTableSwitch = ({ enabled, piid, pluginType }) => {
  const [, dispatch ] = useContext(ConfigContext);

  const handleEnableToggle = () => {
    // XXX: Check to see if currently a default?

    dispatch({ type: "TOGGLE_ENABLED", payload: { enabled: !enabled, piid: piid, pluginType: pluginType } });
  }

  return (
    <Switch
      checked={ enabled }
      onChange={ handleEnableToggle }
      color="primary" />
  )
};

export default CustomTableSwitch;