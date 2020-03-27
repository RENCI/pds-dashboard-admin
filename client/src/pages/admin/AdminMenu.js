import React from "react";
import AdminOverview from './AdminOverview';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function PermanentDrawerLeft() {
 const [value, setValue] = React.useState("overview") 
 const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button onClick={()=> setValue("overview")}>
            <ListItemText primary={"Overview"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={()=> setValue("configure")}>
            <ListItemText primary={"Configure"} />
          </ListItem>
        </List>
        
        <Divider />
        <List>
          <ListItem button onClick={()=> setValue("audit")}>
            <ListItemText primary={"Audit"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {value === "overview" && <AdminOverview /> }
      </main>
    </div>
  );
}
