import React, { useReducer, useEffect } from "react";
import { 
  Box, List, ListSubheader, ListItem, 
  FormControl, FormHelperText, InputLabel, Select, MenuItem, Input, Button, Switch
} from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtil from "@date-io/date-fns"
import axios from "axios";
import SelectorDisplay from "../selector-display/selector-display.component";

import "./plugin-details.styles.scss";

const INITIALIZE_VALUES = "INITIALIZE_VALUES";
const SET_VALUE = "SET_VALUE";
 
const PluginDetails = ({ plugin }) => {
  const [variables, variablesDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case INITIALIZE_VALUES:
        return action.variables.map(variable => ({...variable}));

      case SET_VALUE: {
        const newState = [...state];

        const variable = newState.find(({ id }) => id === action.id);

        if (!variable) return state;

        if (!variable.variableValue) variable.variableValue = {};

        variable.variableValue.value = action.value;

        return newState;
      }

      default:
        console.log("Invalid action type: " + action.type);
    }
  }, []);

  const [parameters, parametersDispatch] = useReducer((state, action) => {
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

  const settings = plugin.settingsDefaults;

  const selectors = settings && settings.pluginSelectors ? settings.pluginSelectors.filter(({ id }) => id !== "pluginType") : [];

  const dependencies = plugin.pluginDependencies ? plugin.pluginDependencies : [];

  useEffect(() => {
    variablesDispatch({ 
      type: INITIALIZE_VALUES, 
      variables: settings && settings.patientVariables ? settings.patientVariables : [] 
    });

    parametersDispatch({ 
      type: INITIALIZE_VALUES, 
      parameters: settings && settings.modelParameters ? settings.modelParameters : [] 
    });
  }, [settings]);

  const control = (id, legalValues, value, dispatch) => {
    const type = 
      legalValues.type === "string" && legalValues.enum ? "enum" :
      legalValues.type === "string" && legalValues.format === "time-stamp" ? "time" :
      legalValues.type === "string" ? "string" :
      legalValues.type === "number" ? "number" :
      legalValues.type === "integer" ? "number" :
      legalValues.type === "boolean" ? "boolean" : 
      "unknown";

    if (value === null) value = type === "boolean" ? false : "";

    const onChange = evt => {
      dispatch({ type: SET_VALUE, id: id, value: evt.target.value });
    };

    const onTimeChange = date => {
      dispatch({ type: SET_VALUE, id: id, value: date });
    };

    const onBooleanChange = evt => {
      dispatch({ type: SET_VALUE, id: id, value: evt.target.checked });
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
                value={ value }
                onChange={ onChange }
              >
                { legalValues.enum.map((value, i) => (
                  <MenuItem key={ i} value={ value }>{ value }</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case "time":
        return (
          <Box mt={ 1 }>
            <MuiPickersUtilsProvider utils={ DateFnsUtil }>
              <KeyboardTimePicker 
                label="Set Default"
                value={ value }
                onChange={ onTimeChange } />
            </MuiPickersUtilsProvider>
          </Box>
        );

      case "string":
        return (
          <Box mt={ 1 }>
            <FormControl fullWidth={ true }>
              <InputLabel>Set Default</InputLabel>
              <Input                 
                type="text"
                value={ value ? value : "" }
                fullWidth={ true }
                onChange={ onChange } />
            </FormControl>
          </Box>
        );

      case "number":
        return (
          <Box mt={ 1 }>
            <FormControl style={{ minWidth: minWidth }}>
              <InputLabel>Set Default</InputLabel>
              <Input 
                type="number"
                value={ value }
                inputProps={{ 
                  min: legalValues.minimum, 
                  max: legalValues.maximum 
                }}
                onChange={ onChange } />
            </FormControl>
          </Box>
        );

      case "boolean":
        return (
          <Box mt={ 1 }>
            <FormControl style={{ minWidth: minWidth }}>
              <FormHelperText>Set Default</FormHelperText>
              <Switch 
                checked={ value } 
                color="primary"
                onChange={ onBooleanChange } />
            </FormControl>
          </Box>
        );

      default:
        console.log("Invalid parameter type: " + legalValues.type);
    }
  };

  const onUpdateClick = async () => {
    try {
      const pluginUpdate = {...plugin};

      delete pluginUpdate.tableData;

      pluginUpdate.settingsDefaults.patientVariables = variables.map(variable => ({...variable}));
      pluginUpdate.settingsDefaults.modelParameters = parameters.map(parameter => ({...parameter}));   

      await axios.post(`${process.env.REACT_APP_API_STAGE}/config/${pluginUpdate.piid}`, pluginUpdate);
    }
    catch (error) {
      console.log(error);
    }
  }

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
        <ListSubheader>{ dependencies.length > 0 ? "Plugin Dependencies" : "No Plugin Dependencies" }</ListSubheader>
        { dependencies.map((dependency, i) => (
          <ListItem key={ i }>
            <Box>
              { dependency }
            </Box>
          </ListItem> 
        ))}
      </List>
      <List>
        <ListSubheader>{ variables.length > 0 ? "Patient Variables" : "No Patient Variables" }</ListSubheader>
        { variables.map((variable, i) => (
          <ListItem key={ i }>
            <Box width={ 1 } p={ 1 } border={ 1 } borderColor="warning.light" borderRadius="borderRadius" mb={ 1 }>
              <Box component="span">{ variable.id }</Box>
              { variable.title ? 
                <>—<Box component="span">{ variable.title }</Box></>
              : null }
              { variable.why ? 
                <>: <Box component="span" color="text.secondary">{ variable.why }</Box></>
              : null }
              { control(
                  variable.id, 
                  variable.legalValues, 
                  variable.variableValue ? variable.variableValue.value : null, 
                  variablesDispatch
                ) }
            </Box>
          </ListItem> 
        ))}
      </List>
      <List>
        <ListSubheader>{ parameters.length > 0 ? "Model Parameters" : "No Model Parameters" }</ListSubheader>
        { parameters.map((parameter, i) => (
          <ListItem key={ i }>
            <Box width={ 1 } p={ 1 } border={ 1 } borderColor="info.light" borderRadius="borderRadius" mb={ 1 }>
              <Box component="span">{ parameter.id }</Box>
              { parameter.title ? 
                <>—<Box component="span">{ parameter.title }</Box></>
              : null }
              { parameter.parameterDescription ? 
                <>: <Box component="span" color="text.secondary">{ parameter.parameterDescription }</Box></>
              : null }
              { control(
                  parameter.id, 
                  parameter.legalValues, 
                  parameter.parameterValue.value, 
                  parametersDispatch
                ) }
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