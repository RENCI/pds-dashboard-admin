import React, { useState, useContext } from "react";
import axios from "axios";
import { Box, Button, IconButton } from "@material-ui/core";
import { Add, DeleteOutline, Autorenew } from "@material-ui/icons";
import MaterialTable from "material-table";
import { ConfigContext } from "../../context/config-context"; 
import { SET_SELECTOR_CONFIG } from '../../context/actionTypes';
import SelectorTableSelectors from "../../components/selector-table-selectors/selector-table-selectors.component";
import SelectorTablePlugins from "../../components/selector-table-plugins/selector-table-plugins.component";
import AddSelectorsDialog from "../add-selectors-dialog/add-selectors-dialog.component";
import ConfirmDialog from "../confirm-dialog/confirm-dialog.component";

import "./selector-table.styles.scss";

const SelectorTable = ({ selectorConfig, selectors, plugins }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeRowData, setRemoveRowData] = useState(null);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [, configDispatch] = useContext(ConfigContext);

  const ruleData = rule => ({
    piid: rule.plugin.piid,
    selectors: rule.selectors.filter(({ id }) => id !== "pluginType")
      .map(({ id, title, selectorValue }) => ({ 
        id: id,
        title: title,
        selectorValue: {
          value: selectorValue.value
        }
      }))
  })

  const onResetClick = async () => {
    setResetDialogOpen(true);
  };

  const onResetDialogClose = () => {
    setResetDialogOpen(false);
  };

  const onResetDialogConfirm = async () => {
    setResetDialogOpen(false);

    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_STAGE}/selectorConfig`, {
        data: selectorConfig.map(ruleData)
      });

      configDispatch({ type: SET_SELECTOR_CONFIG, selectorConfig: res.data });
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
      const res = await axios.post(`${process.env.REACT_APP_API_STAGE}/selectorConfig`, [ruleData(rule)]);

      configDispatch({ type: SET_SELECTOR_CONFIG, selectorConfig: res.data });
    }
    catch (error) {
      console.log(error);
    }
  };

  const onAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const onRemoveClick = rowData => {
    setRemoveDialogOpen(true);
    setRemoveRowData(rowData);
  };

  const onRemoveDialogClose = () => {
    setRemoveDialogOpen(false);
    setRemoveRowData(null);
  };

  const onRemoveDialogConfirm = async () => {
    setRemoveDialogOpen(false);
    setRemoveRowData(null);

    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_STAGE}/selectorConfig`, {
        data: [ruleData(removeRowData)]
      });

      configDispatch({ type: SET_SELECTOR_CONFIG, selectorConfig: res.data });
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid-item">       
      <MaterialTable
        title={ "Selectors → Plugins" }
        columns={[
          { 
            title: "Selector(s)", 
            render: rowData => <SelectorTableSelectors { ...rowData } />,
            customFilterAndSearch: (term, rowData) => {
              console.log(rowData)
              return rowData.plugins.map(plugin => {
                return plugin.title;
              }).join(" ").toLowerCase().includes(term.toLowerCase());
            }
          },
          { 
            title: "Default Plugin", 
            render: rowData => <SelectorTablePlugins {...rowData } />,
            customFilterAndSearch: (term, rowData) => {
              return rowData.selectors.map(selector => {
                return selector.id + " " + selector.title + " " + selector.selectorValue.value + " " + selector.selectorValue.value;
              }).join(" ").toLowerCase().includes(term.toLowerCase());              
            }
          },
          { 
            title: "Remove",
            width: 0, 
            render: rowData => <IconButton onClick={ () => onRemoveClick(rowData) } ><DeleteOutline /></IconButton> 
          } 
        ]}
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
        open={ removeDialogOpen } 
        text={ "Remove selector rule?" }
        onConfirm={ onRemoveDialogConfirm } 
        onClose={ onRemoveDialogClose } />
      <ConfirmDialog 
        open={ resetDialogOpen } 
        text={ "Reset selector rules to defaults?" }
        onConfirm={ onResetDialogConfirm } 
        onClose={ onResetDialogClose } />
    </div>
  );
};

export default SelectorTable;