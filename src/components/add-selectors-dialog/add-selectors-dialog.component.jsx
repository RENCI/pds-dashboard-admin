import React, { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Box, TextField, Divider
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const AddSelectorsDialog = ({ allSelectors, plugins, open, onConfirm, onClose }) => {  
  const [selectors, setSelectors] = useState([]);
  const [plugin, setPlugin] = useState(null);

  useEffect(() => {
    if (!open) {
      setSelectors([]);
      setPlugin(null);
    }      
  }, [open]);

  const selectorOptions = allSelectors.reduce((options, selector) => {
    return options.concat(selector.legalValues.enum.map(value => {
      return {
        id: selector.id,
        title: selector.title,
        selectorValue: {...value} 
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

  const onSelectorChange = (evt, value) => {
    setSelectors(value);
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
        <Box  minWidth="20em">
          <Autocomplete 
            multiple
            options={ selectorOptions }
            groupBy={ selector => selectorLabel(selector) }
            getOptionLabel={ ({ selectorValue }) => valueLabel(selectorValue) } 
            getOptionSelected={ (option, value) => option.id === value.id && option.selectorValue.value === value.selectorValue.value }
            filterSelectedOptions
            onChange={ onSelectorChange }
            renderInput={ params => <TextField {...params} label="Set selectors" placeholder="Add selector" variant="outlined" /> }/>        
          <Box my={ 2 }><Divider variant="middle" /></Box>
          <Autocomplete 
            options={ validPlugins() }
            getOptionLabel={ ({ title }) => title } 
            value={ plugin }
            onChange={ onPluginChange }
            renderInput={ params => <TextField {...params} label="Set default plugin" variant="outlined" /> }/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          color="primary" 
          disabled={ !plugin || selectors.length === 0 }
          onClick={ () => onConfirm({ 
            selectors: selectors, 
            plugin: plugin
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