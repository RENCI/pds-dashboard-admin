import React, { useContext } from "react";
import { ConfigContext } from '../../context/Context';
import { connect } from 'react-redux';
import CustomTable from "../../components/custom-table/custom-table.component";

const SimpleTable = () => {
  const { config } = useContext(ConfigContext);
  return (
    <>
      <CustomTable
        title={"Mapping Plugins"}
        tableHeaders={["Enabled", "ID", "Version", "Plugin Selectors", "Supported Variables", "Title"]}
        pluginKeys={["enabled", "piid", "version", "pluginSelectors", "supportedPatientVariables", "title"]}
        plugins={config.plugins.filter(plugins => plugins.pluginType === 'm')}
      />
      <CustomTable
        title={"Guidance Plugins"}
        tableHeaders={["Enabled", "ID", "Version", "Parameter Defaults", "Plugin Selectors", "Patient Variables", "Title"]}
        pluginKeys={["enabled", "piid", "version", "pluginParameterDefaults", "pluginSelectors", "requiredPatientVariables", "title"]}
        plugins={config.plugins.filter(plugins => plugins.pluginType === 'g')}
      />
      <CustomTable
        title={"FHIR Plugins"}
        tableHeaders={["Enabled", "ID", "Version", "Plugin Selectors", "Title"]}
        pluginKeys={["enabled", "piid", "version", "pluginSelectors", "title"]}
        plugins={config.plugins.filter(plugins => plugins.pluginType === 'f')}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  config: state.config
});

export default connect(mapStateToProps)(SimpleTable);