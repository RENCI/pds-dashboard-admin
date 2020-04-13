import React, { useContext } from 'react';
import { ConfigContext } from '../../context/config-context';
import CustomTable from '../../components/custom-table/custom-table.component';

const PluginsOverview = () => {
  const context = useContext(ConfigContext);
  const { plugins } = context.state;
  return (
    <>
      <CustomTable
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
      />
    </>
  );
}

export default PluginsOverview;