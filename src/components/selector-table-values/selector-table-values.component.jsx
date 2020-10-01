import React from "react";
import { 
  Box,
  MenuItem,  
  FormControl, 
  Select } from "@material-ui/core";

const SelectorTableValues = ({ legalValues }) => {
  //const classes = useStyles();

  const handleChange = (event) => {
    console.log(event.target.value);
  };   

  return (
    <>
      { legalValues.enum.map((value, i) => {
        const id = value.value + "_select";
        const labelId = value.value + "_select_label";

        return (
          <Box  
            key={i}
            display="flex" 
            alignItems="center"
            mb={2}
            width={600}
          >
            <Box 
              flexGrow={0} 
              flexShrink={1}
            >
              { value.value }{ value.title ? " — " + value.title: null }
            </Box>
            <Box 
              flexGrow={1} 
              flexShrink={1} 
              mx={ 2 }
              border={ 1 }
              borderColor="#eee"
              height="0px"
              align="right"
            >
            </Box>
            <Box flexGrow={0} flexShrink={1}>
              { value.plugins.length > 0 ?
                <FormControl>                   
                  <Select
                    labelId={ labelId }
                    id={ id }
                    value={ value.defaultPlugin ? value.defaultPlugin.piid : "" }
                    onChange={ handleChange }
                  >
                    { value.plugins.map((plugin, i) => (
                      <MenuItem key={ i } value={ plugin.piid }>{ plugin.title }</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              : "No matching plugins" }
            </Box>
          </Box>
        );          
      })}
    </>
  )
};

export default SelectorTableValues;