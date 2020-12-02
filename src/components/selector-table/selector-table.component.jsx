import React, { useState, useReducer } from "react";
import { Button, Dialog, DialogTitle, List, ListItem, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Add } from "@material-ui/icons";
import MaterialTable from "material-table";
import "./selector-table.styles.scss";

const ADD_SELECTOR = "ADD_SELECTOR";
const REMOVE_SELECTOR = "REMOVE_SELECTOR";

const AddDialog = ({ allSelectors, open, onClose }) => {  
  const [selectors, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ADD_SELECTOR:
        return [...state, action.selector];

      case REMOVE_SELECTOR:
        return state.slice(0, -1);      
    }
  }, []);

  const options = allSelectors.reduce((options, selector) => {
    return options.concat(selector.legalValues.enum.map(value => {
      return {
        selector: selector,
        value: value 
      };
    }));
  },[]);

  const onChange = evt => {
    console.log(options[evt.target.value]);
  };

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>Add Selector(s)</DialogTitle>
      <List>
        { selectors.map((selector, i) => (
          <ListItem key={ i }>{ selector.title }</ListItem>  
        ))}
      </List>
      <Autocomplete 
        options={ options }
        groupBy={ option => option.selector.id + "—" + option.selector.title }
        getOptionLabel={ option => option.value.value + (option.value.title ? ("—" + option.value.title) : "") } 
        onChange={ onChange }
        renderInput={ params => <TextField {...params} label="Add selector" variant="outlined" /> }/>
    </Dialog>
  );
};

const SelectorTable = ({ config, selectors, title, tableHeaders }) => {
  const [addOpen, setAddOpen] = useState(false);

  const onAddClick = () => {
    setAddOpen(true);
  }

  const onAddClose = () => {
    setAddOpen(false);
  }

  return (
    <div className="grid-item">
      <MaterialTable
        title={ title }
        columns={ tableHeaders }
        data={ config }
      />
      <Button 
        variant="contained" 
        color="primary"
        startIcon={ <Add /> }
        onClick={ onAddClick }>
          Add Selector(s)
      </Button> 
      <AddDialog allSelectors={ selectors } open={ addOpen } onClose={ onAddClose } />
    </div>
  );
};

export default SelectorTable;