import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import SelectorList from '../selector-list/selector-list.component';
import PluginDetails from '../plugin-details/plugin-details.component';

import './custom-table.styles.scss';

const CustomTable = ({ plugins, title, tableHeaders, pluginKeys }) => {

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
              <SelectorList/>
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