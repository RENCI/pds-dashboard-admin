import React from 'react';
import { Box, List, ListSubheader, ListItem } from '@material-ui/core';
import SelectorDisplay from "../selector-display/selector-display.component";

import './plugin-details.styles.scss';
 
const PluginDetails = ({ settings }) => {
  const selectors = settings && settings.pluginSelectors ? settings.pluginSelectors : [];
  const variables = settings && settings.patientVariables ? settings.patientVariables : [];
  const parameters = settings && settings.modelParameters ? settings.modelParameters : [];

  console.log(variables);
  console.log(parameters);

  return (
    <Box ml={ 4 }>
      <List>
        <ListSubheader>{ selectors.length > 0 ? "Selectors" : "No Selectors" }</ListSubheader>
        { selectors.filter(({ id }) => id !== 'pluginType').map((selector, i) => (
            <ListItem key={ i }>
              <SelectorDisplay selector={ selector } />
            </ListItem> 
          )
        )}
      </List>      
      <List>
        <ListSubheader>{ variables.length > 0 ? "Patient Variables" : "No Patient Variables" }</ListSubheader>
        { variables.map((variable, i) => (
            <ListItem key={ i }>
              <Box component="span">{ variable.id }</Box>
              —<Box component="span">{ variable.title }</Box>
              :<Box ml={ 2 }>{ variable.why }</Box>
            </ListItem> 
          )
        )}
      </List>
      <List>
        <ListSubheader>{ parameters.length > 0 ? "Model Parameters" : "No Model Parameters" }</ListSubheader>
        { parameters.map((parameter, i) => (
            <ListItem key={ i }>
              Hi
            </ListItem> 
          )
        )}
      </List>
    </Box>
  )
}

export default PluginDetails