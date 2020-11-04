import React from "react";
import MaterialTable from "material-table";

import "./selector-table.styles.scss";

const SelectorTable = ({ config, title, tableHeaders }) => {
   return (
    <div className="grid-item">
      <MaterialTable
        title={ title }
        columns={ tableHeaders }
        data={ config }
      />
    </div>
  )
};

export default SelectorTable;