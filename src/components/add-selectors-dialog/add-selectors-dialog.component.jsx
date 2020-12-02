import React, { useReducer, Fragment } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Box, TextField, IconButton 
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Add, RemoveCircleOutline } from "@material-ui/icons";

const ADD_SELECTOR = "ADD_SELECTOR";
const REMOVE_SELECTOR = "REMOVE_SELECTOR";

const AddSelectorsDialog = ({ allSelectors, open, onConfirm, onClose }) => {  
  const [selectors, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ADD_SELECTOR:
        return [...state, action.selector];

      case REMOVE_SELECTOR: {
        const newState = [...state];

        newState.splice(action.index, 1);

        return newState;      
      }

      default:
        console.log("Invalid action type");
    }
  }, []);

  const options = allSelectors.reduce((options, selector) => {
    return options.concat(selector.legalValues.enum.map(value => {
      return {
        id: selector.id,
        title: selector.title,
        selectorValue: value 
      };
    }));
  },[]);

  const valueLabel = ({ value, title }) => value + (title ? ("—" + title) : "");

  const selectorLabel = ({ id, title }) => id + "—" + title;

  const selectorValueDisplay = selector => (
    <>
      <Box component="span">{ selectorLabel(selector) }</Box>
      : <Box component="span" fontWeight="fontWeightMedium">
        { valueLabel(selector.selectorValue) }
      </Box>
    </>
  );

  const onChange = (evt, value, reason) => {
    dispatch({ type: ADD_SELECTOR, selector: value });
  };

  const onRemoveClick = index => {
    dispatch({ type: REMOVE_SELECTOR, index: index });
  };

  return (
    <Dialog 
      open={ open } 
      onClose={ onClose }
    >
      <DialogTitle>Add Selector(s)</DialogTitle>
      <DialogContent>
        <Box mb={ 4 } minWidth="20em">
          { selectors.map((selector, i, a) => (        
            <Fragment key={ i }>
              <Box display="flex" alignItems="center">
                <Box flexGrow={ 1 }>{ selectorValueDisplay(selector) }</Box>
                <IconButton onClick={ () => onRemoveClick(i) }>
                  <RemoveCircleOutline />
                </IconButton> 
              </Box>
              { i < a.length - 1 ? 
                <Box 
                  width="100%" 
                  display="flex" 
                  justifyContent="center"
                >
                  <Add />
                </Box> : 
              null }
            </Fragment>
          ))}
        </Box>
        <Autocomplete 
          options={ options }
          groupBy={ selector => selectorLabel(selector) }
          getOptionLabel={ ({ selectorValue }) => valueLabel(selectorValue) } 
          value={ null }
          inputValue={ "" }
          blurOnSelect= { true }
          onChange={ onChange }
          renderInput={ params => <TextField {...params} label="Add selector" variant="outlined" /> }/>
      </DialogContent>
      <DialogActions>
        <Button 
          color="primary" 
          disabled={ selectors.length === 0 }
          onClick={ () => onConfirm(selectors) }
        >
          Confirm
        </Button>
        <Button
          color="primary" 
          onClick={ onClose }
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSelectorsDialog;