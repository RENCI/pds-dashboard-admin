import React, { useState } from "react";
import axios from "axios";
import { Button,  } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import MaterialTable from "material-table";
import AddSelectorsDialog from "../add-selectors-dialog/add-selectors-dialog.component";

import "./selector-table.styles.scss";

const SelectorTable = ({ config, selectors, plugins, title, tableHeaders }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const onAddDialogClick = () => {
    setAddDialogOpen(true);
  }

  const onAddDialogConfirm = async selectorConfig => {
    try {
      // XXX: Comment out until selectorConfig API is implemented
      //const res = await axios.post(`${process.env.REACT_APP_API_STAGE}/selectorConfig`, [selectorConfig]);

      setAddDialogOpen(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  const onAddDialogClose = () => {
    setAddDialogOpen(false);
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
        onClick={ onAddDialogClick }>
          Add Selector Rule
      </Button> 
      <AddSelectorsDialog 
        allSelectors={ selectors } 
        plugins={ plugins }
        open={ addDialogOpen } 
        onConfirm={ onAddDialogConfirm }
        onClose={ onAddDialogClose } 
      />
    </div>
  );
};

export default SelectorTable;