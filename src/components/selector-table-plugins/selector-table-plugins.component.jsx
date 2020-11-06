import React, { useContext } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { ConfigContext } from "../../context/config-context";
import { SET_PLUGIN } from "../../context/actionTypes";

const SelectorTablePlugins = ({ selectors, plugin, plugins }) => {
  const [, configDispatch] = useContext(ConfigContext);

  const handleChange = (event) => {
    configDispatch({ type: SET_PLUGIN, selectors: selectors, piid: event.target.value });
  };   

  return (
    <FormControl>                   
      <Select
        value={ plugin ? plugin.piid : "none" }
        onChange={ handleChange }
      >
        <MenuItem value="none"><em>None</em></MenuItem>
        { plugins.map((plugin, i) => (
          <MenuItem key={ i } value={ plugin.piid }>{ plugin.title }</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default SelectorTablePlugins;