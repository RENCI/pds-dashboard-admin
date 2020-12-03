import React, { useState, useReducer, useEffect, Fragment } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Box, TextField, IconButton, Divider 
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Add, RemoveCircleOutline } from "@material-ui/icons";

const ADD_SELECTOR = "ADD_SELECTOR";
const REMOVE_SELECTOR = "REMOVE_SELECTOR";
const CLEAR = "CLEAR";

const AddSelectorsDialog = ({ allSelectors, plugins, open, onConfirm, onClose }) => {  
  const [selectors, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ADD_SELECTOR:
        return [...state, action.selector];

      case REMOVE_SELECTOR: {
        const newState = [...state];

        newState.splice(action.index, 1);

        return newState;      
      }

      case CLEAR:
        return [];

      default:
        console.log("Invalid action type");
    }
  }, []);

  const [plugin, setPlugin] = useState(null);

  useEffect(() => {
    if (!open) {
      dispatch({ type: CLEAR });
      setPlugin(null);
    }      
  }, [open]);

  const selectorOptions = allSelectors.reduce((options, selector) => {
    return options.concat(selector.legalValues.enum.filter(value => {
      return !selectors.find(({ id, selectorValue }) => id === selector.id && selectorValue.value === value.value);
    }).map(value => {
      return {
        id: selector.id,
        title: selector.title,
        selectorValue: value 
      };
    }));
  },[]);

  const validPlugins = () => {
    return plugins.filter(plugin => {
      return plugin.enabled && plugin.settingsDefaults.pluginSelectors.reduce((present, selector) => {
        return present || selectors.find(({ id, selectorValue }) => {
          return id === selector.id && selectorValue.value === selector.selectorValue.value;
        });
      }, false);
    });
  };

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

  const onSelectorChange = (evt, value) => {
    dispatch({ type: ADD_SELECTOR, selector: value });
  };

  const onRemoveSelectorClick = index => {
    dispatch({ type: REMOVE_SELECTOR, index: index });

    if (plugin && validPlugins().find(({ piid }) => piid === plugin.piid)) {
      setPlugin(null);
    }
  };

  const onPluginChange = (evt, value) => {
    setPlugin(value);
  };

  return (
    <Dialog 
      open={ open } 
      onClose={ onClose }
    >
      <DialogTitle>Selector Rule</DialogTitle>
      <DialogContent>
        <Box mb={ 4 } minWidth="20em">
          { selectors.map((selector, i, a) => (        
            <Fragment key={ i }>
              <Box display="flex" alignItems="center">
                <Box flexGrow={ 1 }>{ selectorValueDisplay(selector) }</Box>
                <IconButton onClick={ () => onRemoveSelectorClick(i) }>
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
          options={ selectorOptions }
          groupBy={ selector => selectorLabel(selector) }
          getOptionLabel={ ({ selectorValue }) => valueLabel(selectorValue) } 
          value={ null }
          inputValue={ "" }
          blurOnSelect= { true }
          onChange={ onSelectorChange }
          renderInput={ params => <TextField {...params} label="Add selector" variant="outlined" /> }/>
        <Box my={ 2 }><Divider variant="middle" /></Box>
        <Autocomplete 
          options={ validPlugins() }
          getOptionLabel={ ({ title }) => title } 
          value={ plugin }
          onChange={ onPluginChange }
          renderInput={ params => <TextField {...params} label="Set plugin" variant="outlined" /> }/>
      </DialogContent>
      <DialogActions>
        <Button 
          color="primary" 
          disabled={ !plugin || selectors.length === 0 }
          onClick={ () => onConfirm({ 
            selectors: selectors, 
            plugin: { piid: plugin.piid }
          }) }
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