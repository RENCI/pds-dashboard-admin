import React from "react";
import { IconButton } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import PluginTableSwitch from "../plugin-table-switch/plugin-table-switch.component";
import PluginDetails from "../plugin-details/plugin-details.component";

import "./plugin-table.styles.scss";

const PluginTable = ({ title, plugins }) => {
  const resetPluginClick = async plugin => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_STAGE}/config/${plugin.piid}`);

      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
      <MaterialTable
        title={ title }
        columns={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => (
            <PluginTableSwitch {...rowData} /> 
          )},
          { title: "Reset", width: 0, render: rowData => (
            <IconButton onClick={ () => resetPluginClick(rowData ) }><Autorenew /></IconButton>
          )}
        ]}
        data={ plugins }
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        detailPanel={[
          {
            tooltip: "Show Details",
            render: rowData => <PluginDetails plugin={ rowData } />
          }
        ]}
      />
  )
};

export default PluginTable;