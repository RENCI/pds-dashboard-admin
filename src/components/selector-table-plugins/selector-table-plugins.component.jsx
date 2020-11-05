import React from "react";
import { 
  MenuItem,  
  FormControl, 
  Select } from "@material-ui/core";

const SelectorTablePlugins = ({ selectors, plugin, plugins }) => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };   

  return (
    <FormControl>                   
      <Select
        value={ plugin.piid }
        onChange={ handleChange }
      >
        <MenuItem value=""><em>None</em></MenuItem>
        { plugins.map((plugin, i) => (
          <MenuItem key={ i } value={ plugin.piid }>{ plugin.title }</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default SelectorTablePlugins;