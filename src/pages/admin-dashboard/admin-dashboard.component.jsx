import React, { useState, useContext } from "react";
import { 
  Button, IconButton, 
  Dialog, DialogActions, DialogContent, DialogContentText 
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { ConfigContext } from "../../context/config-context";
import SelectorTable from "../../components/selector-table/selector-table.component";
import SelectorTableSelectors from "../../components/selector-table-selectors/selector-table-selectors.component";
import SelectorTablePlugins from "../../components/selector-table-plugins/selector-table-plugins.component";
import CustomTable from "../../components/custom-table/custom-table.component";
import CustomTableSwitch from "../../components/custom-table-switch/custom-table-switch.component";
import ConfirmRemoveDialog from "../../components/confirm-remove-dialog/confirm-remove-dialog.component";

import "./admin-dashboard.styles.scss";

const AdminDashboard = () => {
  const [context] = useContext(ConfigContext);
  const { config, selectors, plugins, examplePlugins } = context;
  const [useExampleData, setUseExampleData] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeRowData, setRemoveRowData] = useState(null);

  const toggleDataSource = () => {
    setUseExampleData(!useExampleData)
  };

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
    console.log(removeRowData);

    setRemoveRowData(null);
  };

  const showButton = false;

  const guidancePlugins = useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === "g") : plugins.filter(plugins => plugins.pluginType === "g");

  return (
    <div className="container">
      <div className="grid-item">
        <h1 className="title">PDS Admin Dashboard</h1>
        { showButton ?
          <div
            className={useExampleData ? "data-source-selection example-data" : "data-source-selection config-data"} 
            onClick={toggleDataSource}
          >
            { useExampleData ? "Load Config Data" : "Load Example Data" }
          </div>
        : null }
      </div>
      <SelectorTable
        title={"Selectors → Plugins"}
        tableHeaders={[
          { title: "Selector(s)", render: rowData => <SelectorTableSelectors { ...rowData } /> },
          { title: "Default Plugin", render: rowData => <SelectorTablePlugins {...rowData } /> },
          { width: 0, render: rowData => <IconButton onClick={ () => onRemoveClick(rowData) } ><DeleteOutline /></IconButton> }
        ]}
        config={ config }
        selectors={ selectors }
        plugins={ guidancePlugins }
      />
      <ConfirmRemoveDialog 
        open={ removeDialogOpen } 
        onConfirm={ onRemoveDialogConfirm } 
        onClose={ onRemoveDialogClose } />
      <CustomTable
        title={"Mapper Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === "m") : plugins.filter(plugins => plugins.pluginType === "m")}
        defaultPlugin={ plugins.filter(plugins => plugins.pluginType === "md") }
        showSelectors={ false }
      />
      <CustomTable
        title={"Guidance Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={ guidancePlugins }
        showSelectors={ true }
      />
      <CustomTable
        title={"Convenience Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={ useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === "c") : plugins.filter(plugins => plugins.pluginType === "c") }
        showSelectors={ false }
      />
      <CustomTable
        title={"FHIR Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={ useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === "f") : plugins.filter(plugins => plugins.pluginType === "f") }
        defaultPlugin={ plugins.filter(plugins => plugins.pluginType === "fd") }
        showSelectors={ false }
      />
    </div>
  );
}

export default AdminDashboard;