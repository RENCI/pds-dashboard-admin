import React, { useContext } from "react";
import { LinearProgress } from "@material-ui/core";
import { ConfigContext } from "../../context/config-context";
import SelectorTable from "../../components/selector-table/selector-table.component";
import PluginTable from "../../components/plugin-table/plugin-table.component";

import "./admin-dashboard.styles.scss";

const AdminDashboard = () => {
  const [context] = useContext(ConfigContext);
  const { config, selectors, selectorConfig } = context;

  const guidancePlugins = config ? config.filter(plugin => plugin.pluginType === "g") : null;

  return (
    <div className="container">
      <div className="grid-item">
        <h1 className="title">PDS Admin Dashboard</h1>
      </div>
      { config && selectors && selectorConfig ? 
        <>
          <div className="grid-item">
            <SelectorTable        
              selectorConfig={ selectorConfig }
              selectors={ selectors }
              plugins={ guidancePlugins }
            />      
          </div>
          <div className="grid-item">
            <PluginTable
              title={"Guidance Plugins"}
              plugins={ guidancePlugins }
            />
          </div>
          <div className="grid-item">
            <PluginTable
              title={"Mapper Plugins"}
              plugins={ config.filter(plugin => plugin.pluginType === "m") }
            />
          </div>
          <div className="grid-item">
            <PluginTable
              title={"FHIR Plugins"}
              plugins={ config.filter(plugin => plugin.pluginType === "f") }
            />
          </div>
          <div className="grid-item">
            <PluginTable
              title={"Convenience Plugins"}
              plugins={ config.filter(plugin => plugin.pluginType === "c") }
            />
          </div>
        </>
      : <LinearProgress /> }
    </div>
  );
}

export default AdminDashboard;