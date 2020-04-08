import React from "react";
import PluginsOverview from './PluginsOverview';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PluginsOverview/>
          </Grid>
        </Grid>
      </div>
  );
}
