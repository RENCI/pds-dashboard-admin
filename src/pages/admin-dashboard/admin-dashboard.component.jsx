import React, { useState, useContext } from 'react';
import { ConfigContext } from '../../context/config-context';
import SelectorTable from '../../components/selector-table/selector-table.component';
import SelectorTableValues from '../../components/selector-table-values/selector-table-values.component';
import CustomTable from '../../components/custom-table/custom-table.component';
import CustomTableSwitch from '../../components/custom-table-switch/custom-table-switch.component';

import './admin-dashboard.styles.scss';

const AdminDashboard = () => {
  const context = useContext(ConfigContext);
  const { selectors, plugins, examplePlugins } = context.state;
  const [ useExampleData, setUseExampleData ] = useState(false);

  const toggleDataSource = () => {
    setUseExampleData(!useExampleData)
  }

  return (
    <div className="container">
      <div className="grid-item">
        <h1 className="title">PDS Admin Dashboard</h1>
        <div
          className={useExampleData ? "data-source-selection example-data" : "data-source-selection config-data"} 
          onClick={toggleDataSource}
        >
          {useExampleData ? "Load Config Data" : "Load Example Data"}
        </div>
      </div>
      <SelectorTable
        title={"Selectors"}
        tableHeaders={[
          { title: "ID", field: "id" },
          { title: "Title", field: "title" },
          { title: "Values", render: rowData => <SelectorTableValues {...rowData } /> }
        ]}
        selectors={selectors}
      />
      <CustomTable
        title={"Mapping Plugins"}
        tableHeaders={[
          { title: "Enabled", render: rowData => <CustomTableSwitch {...rowData} /> },
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" }
        ]}
        plugins={useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === 'm') : plugins.filter(plugins => plugins.pluginType === 'm')}
        defaultPlugin={plugins.filter(plugins => plugins.pluginType === 'md')}
        showSelectors={false}
      />
      <CustomTable
        title={"Guidance Plugins"}
        tableHeaders={[
          { title: "Enabled", render: rowData => <CustomTableSwitch {...rowData} /> },
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" }
        ]}
        plugins={useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === 'g') : plugins.filter(plugins => plugins.pluginType === 'g')}
        showSelectors={true}
      />
      <CustomTable
        title={"Convenience Plugins"}
        tableHeaders={[
          { title: "Enabled", render: rowData => <CustomTableSwitch {...rowData} /> },
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" }
        ]}
        plugins={useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === 'c') : plugins.filter(plugins => plugins.pluginType === 'c')}
        showSelectors={false}
      />
      <CustomTable
        title={"FHIR Plugins"}
        tableHeaders={[
          { title: "Enabled", render: rowData => <CustomTableSwitch {...rowData} /> },
          { title: "ID", field: "piid" },
          { title: "Title", field: "title" }
        ]}
        plugins={useExampleData ? examplePlugins.filter(examplePlugins => examplePlugins.pluginType === 'f') : plugins.filter(plugins => plugins.pluginType === 'f')}
        defaultPlugin={plugins.filter(plugins => plugins.pluginType === 'fd')}
        showSelectors={false}
      />
    </div>
  );
}

export default AdminDashboard;