import React, { useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import SelectorList from '../selector-list/selector-list.component';
import PluginDetails from '../plugin-details/plugin-details.component';

import './custom-table.styles.scss';

const CustomTable = ({ plugins, title, tableHeaders }) => {
  const [filterSelectorList, setFilterSelectedList] = useState(['ICD-10CM:I48.91']);

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