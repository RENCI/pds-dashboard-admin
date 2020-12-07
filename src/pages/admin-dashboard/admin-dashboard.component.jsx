import React, { useState, useContext } from "react";
import { ConfigContext } from "../../context/config-context";
import SelectorTable from "../../components/selector-table/selector-table.component";
import SelectorTableSelectors from "../../components/selector-table-selectors/selector-table-selectors.component";
import SelectorTablePlugins from "../../components/selector-table-plugins/selector-table-plugins.component";
import CustomTable from "../../components/custom-table/custom-table.component";
import CustomTableSwitch from "../../components/custom-table-switch/custom-table-switch.component";

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
      <CustomTable
        title={"Guidance Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={ guidancePlugins }
      />
      <CustomTable
        title={"Mapper Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={ config.filter(plugin => plugin.pluginType === "m") }
        defaultPlugin={ config.filter(plugin => plugin.pluginType === "md") }
      />
      <CustomTable
        title={"FHIR Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={ config.filter(plugin => plugin.pluginType === "f") }
        defaultPlugin={ config.filter(plugin => plugin.pluginType === "fd") }
      />
      <CustomTable
        title={"Convenience Plugins"}
        tableHeaders={[
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" },
          { title: "Enabled", width: 0, render: rowData => <CustomTableSwitch {...rowData} /> }
        ]}
        plugins={ config.filter(plugin => plugin.pluginType === "c") }
      />
    </div>
  );
}

export default AdminDashboard;