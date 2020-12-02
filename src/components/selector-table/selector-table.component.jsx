import React, { useState } from "react";
import { Button,  } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import MaterialTable from "material-table";
import AddSelectorsDialog from "../add-selectors-dialog/add-selectors-dialog.component";

import "./selector-table.styles.scss";

const SelectorTable = ({ config, selectors, plugins, title, tableHeaders }) => {
  const [addOpen, setAddOpen] = useState(false);

  const onAddClick = () => {
    setAddOpen(true);
  }

  const onAddConfirm = selectors => {
    console.log(selectors);
  }

  const onAddClose = () => {
    setAddOpen(false);
  }

  return (
    <div className="grid-item">
      <MaterialTable
        title={ title }
        columns={ tableHeaders }
        data={ config }
      />
      <Button 
        variant="contained" 
        color="primary"
        startIcon={ <Add /> }
        onClick={ onAddClick }>
          Add Selector(s)
      </Button> 
      <AddSelectorsDialog 
        allSelectors={ selectors } 
        plugins={ plugins }
        open={ addOpen } 
        onConfirm={ onAddConfirm }
        onClose={ onAddClose } 
      />
    </div>
  );
};

export default SelectorTable;