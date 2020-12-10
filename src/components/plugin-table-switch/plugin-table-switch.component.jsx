import React, { useState, useContext, useEffect } from "react";
import { Switch } from "@material-ui/core";
import axios from "axios";
import { ConfigContext } from "../../context/config-context";

const CustomTableSwitch = ({ enabled, piid, pluginType }) => {
  const [checked, setChecked] = useState(false);
  const [, dispatch ] = useContext(ConfigContext);

  useEffect(() => {
    setChecked(enabled);
  }, [enabled]);

  const handleEnableToggle = async () => {
    const newValue = !checked;

    // Set checked first for UI performance
    setChecked(newValue);

    try {
      await axios.post(`${process.env.REACT_APP_API_STAGE}/config/${piid}`, {
        piid: piid,
        pluginType: pluginType,
        enabled: newValue
      });
  
      dispatch({ type: "TOGGLE_ENABLED", enabled: newValue, piid: piid });      
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