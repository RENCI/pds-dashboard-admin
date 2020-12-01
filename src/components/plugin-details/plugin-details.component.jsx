import React from 'react';
import { Box } from '@material-ui/core';

import './plugin-details.styles.scss';
 
const PluginDetails = ({ selectors }) => {
  return (
    <Box ml={2}>
      { selectors.length > 0 ? <h4>Plugin Selectors</h4> : <h4>No Plugin Selectors</h4> }
      <ul>
        { selectors.filter(({ id }) => id !== 'pluginType').map(selector => (
            <li key={selector.selectorValue.title}>
              <Box component='span' fontWeight='fontWeightBold' mr={2}>{ selector.title }</Box>
              <Box component='span' mr={2}>{ selector.selectorValue.value }</Box>
              <Box component='span' fontStyle='italic'>{ selector.selectorValue.title }</Box>
            </li> 
          )
        )}
      </ul>
    </Box>
  )
}

export default PluginDetails