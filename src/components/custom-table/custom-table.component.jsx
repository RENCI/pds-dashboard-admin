import React from 'react';
import MaterialTable from 'material-table';
import PluginDetails from '../plugin-details/plugin-details.component';

import './custom-table.styles.scss';

const CustomTable = ({ plugins, title, tableHeaders, pluginKeys }) => {

  const data = []
  plugins.map(plugin => data.push(
    { enabled: plugin.enabled, piid: plugin.piid, pluginSelectors: plugin.pluginSelectors, supportedPatientVariables: plugin.supportedPatientVariables, title: plugin.title }
  ))

  return (
    <div className="grid-item">
      <MaterialTable
        title={title}
        columns={tableHeaders}
        data={data}
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