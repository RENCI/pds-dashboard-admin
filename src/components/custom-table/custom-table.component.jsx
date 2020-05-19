import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import SelectorList from '../selector-list/selector-list.component';
import PluginDetails from '../plugin-details/plugin-details.component';

import './custom-table.styles.scss';

const CustomTable = ({ plugins, title, tableHeaders, showSelectors }) => {
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
              {showSelectors ? <SelectorList filterSelectorList={filterSelectorList} setFilterSelectedList={setFilterSelectedList} /> : null }
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