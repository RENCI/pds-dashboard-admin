import React from "react";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";
import CustomTable from "../../components/custom-table/custom-table.component";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),
    overflowX: "auto",
    marginBottom: theme.spacing(4)
  },
  table: {
    minWidth: 650
  },
  tableTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  }
}));

const SimpleTable = ({ config }) => {
  const classes = useStyles();
  console.log(Object.values(config.plugins[1]))
  return (
    <>
      <Typography variant="h6" id="tableTitle" className={classes.tableTitle}>
        Patient Data Provider
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Mappings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>HJ4856UI897</TableCell>
              <TableCell>8.1.2</TableCell>
              <TableCell>CDW-H</TableCell>
              <TableCell>
                The Carolina Data Warehouse for Health (CDW-H) is a central data
                repository containing clinical, research, and administrative
                data sourced from the UNC
              </TableCell>
              <TableCell>M-2343RS43S</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Typography variant="h6" id="tableTitle" className={classes.tableTitle}>
        Mappings
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Standards Supported</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>M-2343RS43S</TableCell>
              <TableCell>hpo-web 1.5.0</TableCell>
              <TableCell>HPO</TableCell>
              <TableCell>
                The Human Phenotype Ontology (HPO) provides a standardized
                vocabulary of phenotypic abnormalities encountered in human
                disease.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Typography variant="h6" id="tableTitle" className={classes.tableTitle}>
        Guidance Plugins Installed
      </Typography>
      <Paper>
          {
            config.plugins
              ?
              <CustomTable plugins={config.plugins.filter(plugins => plugins.pluginType === 'g')}/>
              :
              null
          }
      </Paper>
      <Typography variant="h6" id="tableTitle" className={classes.tableTitle}>
        Model Plugins Installed
      </Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Standards Supported</TableCell>
              <TableCell>Drug</TableCell>
              <TableCell>Patient Variables</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>MPI-34332456a</TableCell>
              <TableCell>
                2.1.2
              </TableCell>
              <TableCell>HPO, pheKB</TableCell>
              <TableCell>Gentamicin</TableCell>
              <TableCell>
                Age, Weight, BMI, Serum Creatinine, Creatinine Clearance
              </TableCell>
              <TableCell>Nomogram for initial dosing of gentamicin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MPI-34134595b</TableCell>
              <TableCell>
                1.3.4
              </TableCell>
              <TableCell>HPO, pheKB</TableCell>
              <TableCell>Amikacin</TableCell>
              <TableCell>
                Age, Weight, BMI, Serum Creatinine, Creatinine Clearance
              </TableCell>
              <TableCell>Nomogram for initial dosing of amikacin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MPI-21343323b</TableCell>
              <TableCell>
                3.2.1
              </TableCell>
              <TableCell>HPO</TableCell>
              <TableCell>Rivaroxaban</TableCell>
              <TableCell>
                Age, Weight, BMI, Serum Creatinine, Creatinine Clearance
              </TableCell>
              <TableCell>Nomogram for initial dosing of rivaroxaban</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

const mapStateToProps = (state) => ({
  config: state.config
})

export default connect(mapStateToProps)(SimpleTable)