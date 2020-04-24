import React from "react";
import { ConfigProvider } from './context/config-context';
import AdminDashboard from './pages/admin-dashboard/admin-dashboard.component';

import './App.css';

const App = () => {
  return (
    <ConfigProvider>
      <AdminDashboard />
    </ConfigProvider>
  )
}

export default App;
