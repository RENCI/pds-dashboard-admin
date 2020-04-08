import React from "react";
import AdminMenu from './AdminMenu';
import Grid from "@material-ui/core/Grid";

const AdminDashboard = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AdminMenu />
        </Grid>
      </Grid>
    </>
  );
}

export default AdminDashboard;