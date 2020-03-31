import React from 'react';

import CustomTableHead from '../custom-table-head/custom-table-head.component';
import CustomTableRow from '../custom-table-row/custom-table-row.component';

const CustomTable = ({ plugins, title, tableHeaders, pluginKeys }) => {
  return (
    <>
      <h3 id="tableTitle">
        {title}
      </h3>
      <div>
        <table>
          <CustomTableHead tableHeaders={tableHeaders}/>
          <tbody>
            {plugins.map(plugin => <CustomTableRow plugin={plugin} key={plugin.piid} pluginKeys={pluginKeys}/>)}
          </tbody>
        </table>
      </div>
    </>
  )
};

export default CustomTable;