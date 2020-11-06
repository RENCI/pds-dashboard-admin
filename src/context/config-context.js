import React, { useEffect, useReducer, createContext } from 'react';
import { configValidator } from '../validation/config.validation';

import axios from 'axios';
import CONFIG_DATA from './config.data';

import { 
  SET_DEFAULT_CONFIG, 
  SET_CONFIG, 
  SET_SELECTORS, 
  SET_PLUGINS, 
  TOGGLE_ENABLED,
  SET_PLUGIN
} from './actionTypes';

const initialState = {
  defaultConfig: [],
  config: [],
  plugins: [],
  selectors: [],
  examplePlugins: CONFIG_DATA
};

const toggleEnabled = async (payload) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_STAGE}/config/${payload.piid}`, payload);
    if (res.status === 200) {
      console.log("Enable Plugin Response: ", payload.piid);
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getDefaultConfig = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE}/configFactoryDefault`);
    if (res.status === 200) {
      console.log("Default config: ", res.data);
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getConfig = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE}/config`);
    if (res.status === 200) {
      console.log("Config: ", res.data);
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getSelectors = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE}/selectors`);
    if (res.status === 200) {
      console.log("Selectors: ", res.data);
      return res.data;
    }
  } catch (error) {
    throw new Error("Unable to get selectors: ", error);
  }
};

const setSelectorPlugins = (selectors, plugins) => {
  selectors.forEach(selector => {
    selector.legalValues.enum.forEach(value => {
      value.plugins = [];

      plugins.filter(({ settingsDefaults }) => settingsDefaults.pluginSelectors).forEach(plugin => {
        plugin.settingsDefaults.pluginSelectors.forEach(pluginSelector => {
          if (selector.id === pluginSelector.id &&
              value.value === pluginSelector.selectorValue.value) {
            value.plugins.push(plugin);
          }
        });
      });

      value.defaultPlugin = value.plugins.length > 0 ? value.plugins[0] : null;
    });
  });
};

const selectorCompare = (selector1, selector2) => {
  return selector1.id === selector2.id && selector1.selectorValue.value === selector2.selectorValue.value;
};

const selectorsCompare = (group1, group2) => {
  return group1.reduce((accum, selector1) => {
    return accum && group2.some(selector2 => selectorCompare(selector1, selector2));
  }, true);
}

const copyConfigPlugins = (config, defaultConfig) => {
  config.forEach(mapping => {
    const defaultMapping = defaultConfig.find(defaultMapping => {
      return selectorsCompare(mapping.selectors, defaultMapping.selectors);
    });

    if (defaultMapping) {
      mapping.plugins = [...defaultMapping.plugins]
    }
  })
};

const setPlugin = (config, selectors, piid) => {
  const mapping = config.find(mapping => selectorsCompare(mapping.selectors, selectors));

  if (mapping) {
    mapping.plugin = mapping.plugins.find(plugin => plugin.piid === piid);
  }
};

const configReducer = (state, action) => {
  switch (action.type) {
    case SET_DEFAULT_CONFIG:
      return {
        ...state,
        defaultConfig: action.config
      };

    case SET_CONFIG: {
      copyConfigPlugins(action.config, state.defaultConfig);

      return {
        ...state,
        config: action.config
      };
    }

    case SET_PLUGINS:
      return {
        ...state,
        plugins: action.plugins
      };

    case SET_SELECTORS:
      setSelectorPlugins(action.selectors, state.plugins);

      return {
        ...state,
        selectors: action.selectors
      };

    case TOGGLE_ENABLED:
      toggleEnabled(action.payload);

      // XXX: Should response in toggleEnabled contain updated plugin?
      const plugin = state.plugins.find(plugin => plugin.piid === action.payload.piid);
      plugin.enabled = action.payload.enabled;

      return {
        ...state
      };

    case SET_PLUGIN:
      setPlugin(state.config, action.selectors, action.piid);

      return {
        ...state
      };

    default:
      throw new Error("Invalid config action: " + action.type);
  };
};

export const ConfigContext = createContext(initialState);

export const ConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDefaultConfig();

        if (configValidator(res)) {
          dispatch({
            type: SET_DEFAULT_CONFIG,
            config: res
          });
        } 
        else {
          throw new Error("Default config data is invalid: " + res);
        }

        // XXX: Temporary fix: get plugins from default config
        const plugins = res.reduce((all, current) => {
          current.plugins.forEach(plugin => {
            if (!all.find(({ piid }) => piid === plugin.piid)) {
              all.push(plugin);
            }
          });

          return all;
        }, []);

        dispatch({
          type: SET_PLUGINS,
          plugins: plugins
        });
      }
      catch (error) {
        console.log(error);
      } 
      
      try {
        const res = await getConfig();

        if (configValidator(res)) {
          dispatch({
            type: SET_CONFIG,
            config: res
          });          
        } 
        else {
          throw new Error("Config data is invalid: " + res);
        }
      }
      catch (error) {
        console.error(error);
      }

      try {
        const res = await getSelectors();

        if (configValidator(res)) {
          dispatch({
            type: SET_SELECTORS,
            selectors: res
          });
        } 
        else {
          throw new Error("Selector data is invalid: " + res);
        }
      }
      catch (error) {
        console.error(error);
      }      
    })();
  }, []);

  return (
    <ConfigContext.Provider value={ [state, dispatch] }>
      {children}
    </ConfigContext.Provider>
  );
}; 