import React from 'react';

import './plugin-details.styles.scss';
 
const PluginDetails = ({ selectors }) => {
  return (
    <div>
      <h4>Plugin Selectors</h4>
      {selectors.map(selector => <li key={selector.id}>{selector.selectorValue.title}, {selector.selectorValue.value}</li> )}
    </div>
  )
}

export default PluginDetails