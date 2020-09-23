import React, { useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';

import './selector-table.styles.scss';

const SelectorTable = ({ selectors, title, tableHeaders }) => {
   return (
    <div className="grid-item">
      <MaterialTable
        title={title}
        columns={tableHeaders}
        data={selectors}
      />
    </div>
  )
};

export default SelectorTable;