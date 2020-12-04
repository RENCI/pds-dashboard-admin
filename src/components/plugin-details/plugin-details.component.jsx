import React, { useReducer, useEffect } from 'react';
import { 
  Box, List, ListSubheader, ListItem, 
  FormControl, InputLabel, Select, MenuItem, Input, Button, Switch
} from '@material-ui/core';
import axios from "axios";
import SelectorDisplay from "../selector-display/selector-display.component";

import './plugin-details.styles.scss';

const INITIALIZE_VALUES = "INITIALIZE_VALUES";
const SET_VALUE = "SET_VALUE";
 
const PluginDetails = ({ settings }) => {
  const [parameters, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case INITIALIZE_VALUES:
        return action.parameters.map(parameter => ({...parameter}));

      case SET_VALUE: {
        const newState = [...state];

        const parameter = newState.find(({ id }) => id === action.id);

        if (!parameter) return state;

        parameter.parameterValue.value = action.value;

        return newState;
      }

      default:
        console.log("Invalid action type: " + action.type);
    }
  }, []);

  const selectors = settings && settings.pluginSelectors ? settings.pluginSelectors.filter(({ id }) => id !== "pluginType") : [];
  const variables = settings && settings.patientVariables ? settings.patientVariables : [];

  useEffect(() => {
    dispatch({ 
      type: INITIALIZE_VALUES, 
      parameters: settings && settings.modelParameters ? settings.modelParameters : [] 
    });
  }, [settings]);

  const parameterControl = parameter => {
    const type = 
      parameter.legalValues.type === "string" && parameter.legalValues.enum ? "enum" :
      parameter.legalValues.type === "string" && parameter.legalValues.format === "time-stamp" ? "time" :
      parameter.legalValues.type === "string" ? "string" :
      parameter.legalValues.type === "number" ? "number" :
      parameter.legalValues.type === "integer" ? "number" :
      parameter.legalValues.type === "boolean" ? "boolean" : 
      "unknown";

    const onChange = evt => {
      dispatch({ type: SET_VALUE, id: parameter.id, value: evt.target.value });
    };

    const onBooleanChange = evt => {
      dispatch({ type: SET_VALUE, id: parameter.id, value: evt.target.checked });
    };

    const minWidth = 200;

    switch (type) {
      case "enum":
        return (
          <Box mt={ 1 }>
            <FormControl style={{ minWidth: minWidth }}>
              <InputLabel>Set Default</InputLabel>
              <Select 
              fullWidth={ true }
                value={ parameter.parameterValue.value }
                onChange={ onChange }
              >
                { parameter.legalValues.enum.map((value, i) => (
                  <MenuItem key={ i} value={ value }>{ value }</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case "time":
        return null;

      case "string":
        return (
          <Box mt={1}>
            <FormControl fullWidth={ true }>
              <InputLabel>Set Default</InputLabel>
              <Input                 
                type="text"
                value={ parameter.parameterValue.value ? parameter.parameterValue.value : "" }
                fullWidth={ true }
                onChange={ onChange } />
            </FormControl>
          </Box>
        );

      case "number":
        return (
          <Box mt={1}>
            <FormControl style={{ minWidth: minWidth }}>
              <InputLabel>Set Default</InputLabel>
              <Input 
                type="number"
                value={ parameter.parameterValue.value }
                inputProps={{ 
                  min: parameter.legalValues.minimum, 
                  max: parameter.legalValues.maximum 
                }}
                onChange={ onChange } />
            </FormControl>
          </Box>
        );

      case "boolean":
        return (
          <Switch 
            checked={ parameter.parameter.value } 
            color="primary"
            onChange={ onBooleanChange } />
        );

      default:
        console.log("Invalid parameter type:" + parameter.legalValues.type);
    }
  };

  const onUpdateClick = () => {
    // XXX: Make call to API when implemented
  };

  return (
    <Box ml={ 4 }>
      <List>
        <ListSubheader>{ selectors.length > 0 ? "Selectors" : "No Selectors" }</ListSubheader>
        { selectors.map((selector, i) => (
          <ListItem key={ i }>
            <Box>
              <SelectorDisplay selector={ selector } />
            </Box>
          </ListItem> 
        ))}
      </List>      
      <List>
        <ListSubheader>{ variables.length > 0 ? "Patient Variables" : "No Patient Variables" }</ListSubheader>
        { variables.map((variable, i) => (
          <ListItem key={ i }>
            <Box>
              <Box component="span">{ variable.id }</Box>
              { variable.title ? 
                <>—<Box component="span">{ variable.title }</Box></>
              : null }
              { variable.why ? 
                <>: <Box component="span" color="text.secondary">{ variable.why }</Box></>
              : null }
            </Box>
          </ListItem> 
        ))}
      </List>
      <List>
        <ListSubheader>{ parameters.length > 0 ? "Model Parameters" : "No Model Parameters" }</ListSubheader>
        { parameters.map((parameter, i) => (
          <ListItem key={ i }>
            <Box mb={ 2 }>
              <Box component="span">{ parameter.id }</Box>
              { parameter.title ? 
                <>—<Box component="span">{ parameter.title }</Box></>
              : null }
              { parameter.parameterDescription ? 
                <>: <Box component="span" color="text.secondary">{ parameter.parameterDescription }</Box></>
              : null }
              { parameterControl(parameter) }
            </Box>
          </ListItem> 
        ))}
        { parameters.length > 0 ? 
          <ListItem>
            <Button  
              variant="contained" 
              color="primary"
              onClick={ onUpdateClick }
            >
              Update
            </Button>
          </ListItem>
        : null }
      </List>      
    </Box>
  )
}

export default PluginDetails