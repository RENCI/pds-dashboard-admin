import React, { useContext } from 'react';
import { ConfigContext } from '../../context/config-context';
import CustomTable from '../../components/custom-table/custom-table.component';
import CustomTableSwitch from '../../components/custom-table-switch/custom-table-switch.component';

import './admin-dashboard.styles.scss';

const AdminDashboard = () => {
  const context = useContext(ConfigContext);
  const { plugins } = context.state;
  return (
    <div className="container">
      <CustomTable
        title={"Mapping Plugins"}
        tableHeaders={[
          { title: "Enabled", field: 'enabled', render: rowData => <CustomTableSwitch enabled={rowData.enabled} piid={rowData.piid}/>},
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" }
        ]}
        plugins={plugins.filter(plugins => plugins.pluginType === 'm')}
      />
      <CustomTable
      title={"Guidance Plugins"}
        tableHeaders={[
          { title: "Enabled", field: 'enabled', render: rowData => <CustomTableSwitch enabled={rowData.enabled} piid={rowData.piid}/>},
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" }
        ]}
        plugins={plugins.filter(plugins => plugins.pluginType === 'g')}
      />
      <CustomTable
      title={"FHIR Plugins"}
        tableHeaders={[
          { title: "Enabled", field: 'enabled', render: rowData => <CustomTableSwitch enabled={rowData.enabled} piid={rowData.piid}/>},
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" }
        ]}
        plugins={plugins.filter(plugins => plugins.pluginType === 'f')}
      />
    </div>
    /* <CustomTable
      title={"Mapping Plugins"}
      tableHeaders={["Enabled", "ID", "Plugin Selectors", "Supported Variables", "Title"]}
      pluginKeys={["enabled", "piid", "pluginSelectors", "supportedPatientVariables", "title"]}
      plugins={plugins.filter(plugins => plugins.pluginType === 'm')}
    />
    <CustomTable
      title={"Guidance Plugins"}
      tableHeaders={["Enabled", "ID", "Parameter Defaults", "Plugin Selectors", "Patient Variables", "Title"]}
      pluginKeys={["enabled", "piid", "pluginParameterDefaults", "pluginSelectors", "requiredPatientVariables", "title"]}
      plugins={plugins.filter(plugins => plugins.pluginType === 'g')}
    />
    <CustomTable
      title={"FHIR Plugins"}
      tableHeaders={["Enabled", "ID", "Plugin Selectors", "Title"]}
      pluginKeys={["enabled", "piid", "pluginSelectors", "title"]}
      plugins={plugins.filter(plugins => plugins.pluginType === 'f')}
    /> */
  );
}

export default AdminDashboard;