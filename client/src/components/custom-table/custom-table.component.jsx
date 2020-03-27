import React from 'react';

import CustomTableHead from '../custom-table-head/custom-table-head.component';
import CustomTableRow from '../custom-table-row/custom-table-row.component';

const CustomTable = ({ plugins }) => {
  return (
    <table>
      <CustomTableHead />      
      <tbody>
        {plugins.map(plugin => <CustomTableRow plugin={plugin} key={plugin.piid}/>)}
      </tbody>
    </table>
  )
};

export default CustomTable;