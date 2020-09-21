import React from 'react';

import './plugin-details.styles.scss';
 
const PluginDetails = ({ selectors }) => {
  return (
    <div style={{ marginLeft: "10px" }}>
      <h4>Plugin Selectors</h4>
      <ul>
        { selectors.map(selector => (
            <li key={selector.selectorValue.title}>
              {selector.selectorValue.value}, {selector.selectorValue.title}
            </li> 
          )
        )}
      </ul>
    </div>
  )
}

export default PluginDetails