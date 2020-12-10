import React, { useState, useContext, useEffect } from "react";
import { Switch } from "@material-ui/core";
import axios from "axios";
import { ConfigContext } from "../../context/config-context";

const CustomTableSwitch = ({ enabled, piid, pluginType }) => {
  const [checked, setChecked] = useState(false);
  const [, dispatch ] = useContext(ConfigContext);

  useEffect(() => {
    setChecked(enabled);
  }, [piid]);

  const handleEnableToggle = async () => {
    // Set checked first for UI performance
    setChecked(!checked);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_STAGE}/config/${piid}`, {
        piid: piid,
        pluginType: pluginType,
        enabled: enabled
      });
  
      dispatch({ type: "TOGGLE_ENABLED", enabled: checked, piid: piid });      
    } catch (error) {
      console.error(error);
    }   
  }

  return (
    <Switch
      checked={ checked }
      onChange={ handleEnableToggle }
      color="primary" />
  )
};

export default CustomTableSwitch;