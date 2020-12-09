import React, { useState, useContext } from "react";
import axios from "axios";
import { Box, Button, IconButton } from "@material-ui/core";
import { Add, DeleteOutline, Autorenew } from "@material-ui/icons";
import MaterialTable from "material-table";
import { ConfigContext } from "../../context/config-context"; 
import { SET_SELECTOR_CONFIG } from '../../context/actionTypes';
import AddSelectorsDialog from "../add-selectors-dialog/add-selectors-dialog.component";
import ConfirmDialog from "../confirm-dialog/confirm-dialog.component";

import "./selector-table.styles.scss";

const SelectorTable = ({ selectorConfig, selectors, plugins, title, tableHeaders }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [confirmDialogText, setConfirmDialogText] = useState(null);
  const [removeRowData, setRemoveRowData] = useState(null);
  const [, configDispatch] = useContext(ConfigContext);

  const onResetClick = async () => {
    setConfirmDialogText("Reset selector rules to defaults?");
  };

  const onResetDialogClose = () => {
    setConfirmDialogText(null);
  };

  const onResetDialogConfirm = async () => {
    setConfirmDialogText(null);

    try {
      // XXX: Implement reset
    }
    catch (error) {
      console.log(error);
    }
  };

  const onAddDialogClick = () => {
    setAddDialogOpen(true);
  };

  const onAddDialogConfirm = async rule => {
    setAddDialogOpen(false);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_STAGE}/selectorConfig`, [{
        piid: rule.plugin.piid,
        selectors: rule.selectors.map(({ id, selectorValue }) => ({ 
          id: id,
          selectorValue: {
            value: selectorValue.value
          }
        }))
      }]);

      configDispatch({ type: SET_SELECTOR_CONFIG, selectorConfig: res });
    }
    catch (error) {
      console.log(error);
    }
  };

  const onAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const onRemoveClick = rowData => {
    setConfirmDialogText("Remove selector rule?");
    setRemoveRowData(rowData);
  };

  const onRemoveDialogClose = () => {
    setConfirmDialogText(null);
    setRemoveRowData(null);
  };

  const onRemoveDialogConfirm = async () => {
    setConfirmDialogText(null);
    setRemoveRowData(null);

    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_STAGE}/selectorConfig`, [{
        piid: removeRowData.plugin.piid,
        selectors: removeRowData.selectors.map(({ id }) => ({ id: id }))
      }]);

      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid-item">      
      <MaterialTable
        title={ title }
        columns={ [...tableHeaders,
          { width: 0, render: rowData => <IconButton onClick={ () => onRemoveClick(rowData) } ><DeleteOutline /></IconButton> } ] 
        }
        data={ selectorConfig }        
      />
      <Box width={ 1 } display="flex">
        <Box flexGrow= { 1 }>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={ <Add /> }
            onClick={ onAddDialogClick }
          >
            Add Selector Rule
          </Button>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={ <Autorenew /> }
          onClick={ onResetClick }
        >
          Reset to Defaults
        </Button>
      </Box>
      <AddSelectorsDialog 
        allSelectors={ selectors } 
        plugins={ plugins }
        open={ addDialogOpen } 
        onConfirm={ onAddDialogConfirm }
        onClose={ onAddDialogClose } />
      <ConfirmDialog 
        open={ confirmDialogText !== null } 
        text={ confirmDialogText }
        onConfirm={ onResetDialogConfirm } 
        onClose={ onResetDialogClose } />
    </div>
  );
};

export default SelectorTable;