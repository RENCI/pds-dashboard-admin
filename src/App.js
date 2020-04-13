import React from "react";
import { ConfigProvider } from './context/config-context';
import AdminDashboard from './pages/admin-dashboard/admin-dashboard.component';

const App = () => {
  return (
    <ConfigProvider>
      <AdminDashboard />
    </ConfigProvider>
  )
}

export default App;
