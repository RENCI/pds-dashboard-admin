import React, { useState } from "react";
import axios from "axios";
import { Button, IconButton } from "@material-ui/core";
import { Add, DeleteOutline } from "@material-ui/icons";
import MaterialTable from "material-table";
import AddSelectorsDialog from "../add-selectors-dialog/add-selectors-dialog.component";
import ConfirmRemoveDialog from "../confirm-remove-dialog/confirm-remove-dialog.component";


import "./selector-table.styles.scss";

const SelectorTable = ({ config, selectors, plugins, title, tableHeaders }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeRowData, setRemoveRowData] = useState(null);

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

  const onRemoveClick = rowData => {
    setRemoveDialogOpen(true);
    setRemoveRowData(rowData);
  };

  const onRemoveDialogClose = () => {
    setRemoveDialogOpen(false);
    setRemoveRowData(null);
  };

  const onRemoveDialogConfirm = () => {
    setRemoveDialogOpen(false);

    // XXX: Make call to API when implemented
    //const res = await axios.delete(`${process.env.REACT_APP_API_STAGE}/selectorConfig`, [selectorConfig]);
    console.log(removeRowData);

    setRemoveRowData(null);
  };

  return (
    <div className="grid-item">
      <MaterialTable
        title={ title }
        columns={ [...tableHeaders,
          { width: 0, render: rowData => <IconButton onClick={ () => onRemoveClick(rowData) } ><DeleteOutline /></IconButton> } ] 
        }
        data={ config }
      />
      <ConfirmRemoveDialog 
        open={ removeDialogOpen } 
        onConfirm={ onRemoveDialogConfirm } 
        onClose={ onRemoveDialogClose } />
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