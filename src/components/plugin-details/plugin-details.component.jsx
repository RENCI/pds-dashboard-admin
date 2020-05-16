import React from 'react';

import './plugin-details.styles.scss';
 
const PluginDetails = ({ selectors }) => {
  return (
    <div>
      <h4>Plugin Selectors</h4>
      {selectors.map(selector => <li key={selector.selectorValue.title}>{selector.selectorValue.value}, {selector.selectorValue.title}</li> )}
    </div>
  )
}

export default PluginDetails