import React, { useEffect, useReducer, createContext } from 'react';
import { configValidator } from '../validation/config.validation';

import axios from 'axios';

import {  
  SET_CONFIG_DEFAULT,
  SET_CONFIG, 
  SET_SELECTORS, 
  SET_SELECTOR_CONFIG_DEFAULT, 
  SET_SELECTOR_CONFIG,
  TOGGLE_ENABLED,
  SET_PLUGIN
} from './actionTypes';

const initialState = {
  configDefault: [],
  config: [],
  selectors: [],
  selectorConfigDefault: [],
  selectorConfig: []
};

const toggleEnabled = async (payload) => {
  console.log(JSON.stringify(payload));

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

const getConfigDefault = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE}/configFactoryDefault`);
    if (res.status === 200) {
      console.log("Config default: ", res.data);
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

const getSelectorConfigDefault = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE}/selectorConfigFactoryDefault`);
    if (res.status === 200) {
      console.log("Selector config factory default: ", res.data);
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getSelectorConfig = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE}/selectorConfig`);
    if (res.status === 200) {
      console.log("Selector config: ", res.data);
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const processConfig = (config, configDefault) => {
  configDefault.forEach(plugin => {
    if (!config.find(({ piid }) => piid === plugin.piid)) {
      const newPlugin = {...plugin};

      newPlugin.enabled = false;

      config.push(newPlugin);
    }
  });
}

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

const selectorGroupCompare = (group1, group2) => {
  return group1.reduce((accum, selector1) => {
    return accum && group2.some(selector2 => selectorCompare(selector1, selector2));
  }, true);
}

const copySelectorConfigPlugins = (selectorConfig, selectorDefaultConfig) => {
  selectorConfig.forEach(rule => {
    const defaultRule = selectorDefaultConfig.find(defaultRule => {
      return selectorGroupCompare(rule.selectors, defaultRule.selectors);
    });

    rule.plugins = defaultRule ? [...defaultRule.plugins] : [rule.plugin];
  });
};

const setPlugin = (selectorConfig, selectors, piid) => {
  const rule = selectorConfig.find(rule => selectorGroupCompare(rule.selectors, selectors));

  if (rule) {
    rule.plugin = rule.plugins.find(plugin => plugin.piid === piid);
  }
};

const configReducer = (state, action) => {
  switch (action.type) {
    case SET_CONFIG_DEFAULT:
      return {
        ...state,
        configDefault: action.configDefault
      };

    case SET_CONFIG:
      processConfig(action.config, state.configDefault);

      return {
        ...state,
        config: action.config
      };

    case SET_SELECTORS:
      setSelectorPlugins(action.selectors, state.config);

      return {
        ...state,
        selectors: action.selectors
      };

    case SET_SELECTOR_CONFIG_DEFAULT: {  
      return {
        ...state,
        selectorConfigDefault: action.selectorConfigDefault
      };
    }

    case SET_SELECTOR_CONFIG: {
      copySelectorConfigPlugins(action.selectorConfig, state.selectorConfigDefault);

      return {
        ...state,
        selectorConfig: action.selectorConfig
      };
    }

    case TOGGLE_ENABLED:
      toggleEnabled(action.payload);

      // XXX: Should response in toggleEnabled contain updated plugin?
      const plugin = state.config.find(plugin => plugin.piid === action.payload.piid);
      plugin.enabled = action.payload.enabled;

      return {
        ...state
      };

    case SET_PLUGIN:
      setPlugin(state.selectorConfig, action.selectors, action.piid);

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
        const res = await getConfigDefault();

        if (configValidator(res)) {
          dispatch({
            type: SET_CONFIG_DEFAULT,
            configDefault: res
          });
        } 
        else {
          throw new Error("Default config data is invalid: " + res);
        }
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
        console.log(error);
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
      
      try {
        const res = await getSelectorConfigDefault();

        if (configValidator(res)) {
          dispatch({
            type: SET_SELECTOR_CONFIG_DEFAULT,
            selectorConfigDefault: res
          });          
        } 
        else {
          throw new Error("Default selector config data is invalid: " + res);
        }
      }
      catch (error) {
        console.error(error);
      }     

      try {
        const res = await getSelectorConfig();

        if (configValidator(res)) {
          dispatch({
            type: SET_SELECTOR_CONFIG,
            selectorConfig: res
          });          
        } 
        else {
          throw new Error("Selector config data is invalid: " + res);
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