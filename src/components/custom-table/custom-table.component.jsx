import React, { useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import PluginDetails from '../plugin-details/plugin-details.component';

import './custom-table.styles.scss';

const CustomTable = ({ plugins, title, tableHeaders }) => {
  return (
    <div className="grid-item">
      <MaterialTable
        title={title}
        columns={tableHeaders}
        data={plugins}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        detailPanel={[
          {
            tooltip: 'Show Details',
            render: rowData => <PluginDetails settings={ rowData.settingsDefaults } />
          }
        ]}
      />
    </div>
  )
};

export default CustomTable;