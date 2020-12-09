import React, { useContext } from "react";
import { ConfigContext } from "../../context/config-context";
import SelectorTable from "../../components/selector-table/selector-table.component";
import SelectorTableSelectors from "../../components/selector-table-selectors/selector-table-selectors.component";
import SelectorTablePlugins from "../../components/selector-table-plugins/selector-table-plugins.component";
import PluginTable from "../../components/plugin-table/plugin-table.component";
import PluginTableSwitch from "../../components/plugin-table-switch/plugin-table-switch.component";

import "./admin-dashboard.styles.scss";

const AdminDashboard = () => {
  const [context] = useContext(ConfigContext);
  const { config, selectors, selectorConfig } = context;

  const guidancePlugins = config.filter(plugin => plugin.pluginType === "g");



  return (
    <div className="container">
      <div className="grid-item">
        <h1 className="title">PDS Admin Dashboard</h1>
      </div>
      <SelectorTable
        title={"Selectors → Plugins"}
        tableHeaders={[
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
          }
        ]}
        selectorConfig={ selectorConfig }
        selectors={ selectors }
        plugins={ guidancePlugins }
      />      
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
    </div>
  );
}

export default AdminDashboard;