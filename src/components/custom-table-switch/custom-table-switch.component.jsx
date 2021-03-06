import React, { useContext } from "react";
import { Switch } from "@material-ui/core";
import { ConfigContext } from "../../context/config-context";

const CustomTableSwitch = ({ enabled, piid, pluginType }) => {
  const [, dispatch ] = useContext(ConfigContext);

  const handleEnableToggle = () => {
    dispatch({ type: "TOGGLE_ENABLED", payload: { enabled: !enabled, piid: piid, pluginType: pluginType } })
  }

  return (
    <Switch
      checked={ enabled }
      onChange={ handleEnableToggle }
      color="primary"
      name="checkedA"
      inputProps={{ "aria-label": "checkbox" }}
    />
  )
};

export default CustomTableSwitch;