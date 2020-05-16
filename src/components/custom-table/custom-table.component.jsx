import React, { useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import PluginDetails from '../plugin-details/plugin-details.component';

import './custom-table.styles.scss';

const CustomTable = ({ plugins, title, tableHeaders, pluginKeys }) => {
  const [selectors, setSelectors] = useState([]);
  const [data, setData] = useState([]);
  
  plugins.map(plugin => data.push(
    { enabled: plugin.enabled, piid: plugin.piid, pluginSelectors: plugin.pluginSelectors, supportedPatientVariables: plugin.supportedPatientVariables, title: plugin.title }
  ))

  return (
    <div className="grid-item">
      <MaterialTable
        title={title}
        columns={tableHeaders}
        data={data}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <input placeholder="Selector" /><button>+</button>
            </div>
          ),
        }}
        detailPanel={[
          {
            tooltip: 'Show Details',
            render: rowData => {
              return (
                <PluginDetails selectors={rowData.pluginSelectors} />
              )
            },
          },
        ]}
      />
    </div>
  )
};

export default CustomTable;