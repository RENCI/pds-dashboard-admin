import React from "react";
import { ConfigProvider } from './context/Context';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <ConfigProvider>
      <AdminDashboard />
    </ConfigProvider>
  )
}

export default App;
