import React from "react";
import MaterialTable from "material-table";

import "./selector-table.styles.scss";

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