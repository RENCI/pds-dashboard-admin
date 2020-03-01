import React from "react";
import { connect } from 'react-redux';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = ({ config }) => {
  return (
    <div>
      {config.plugins.length}
    </div>
  )
}

const mapStateToProps = state => ({
  config: state.config
})

export default connect(mapStateToProps)(App);
