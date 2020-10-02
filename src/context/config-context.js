import React, { useEffect, useReducer, createContext } from 'react';
import { configValidator } from '../validation/config.validation';

import axios from 'axios';
import CONFIG_DATA from './config.data';

import { SET_CONFIG, TOGGLE_ENABLED, SET_SELECTORS } from './actionTypes';

const initialState = {
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

const configReducer = (state, action) => {
  switch (action.type) {
    case SET_CONFIG:      
      return {
        ...state,
        plugins: action.plugins
      };

    case TOGGLE_ENABLED:
      toggleEnabled(action.payload)

      // XXX: Should response in toggleEnabled contain updated plugin?
      const plugin = state.plugins.find(plugin => plugin.piid === action.payload.piid);
      plugin.enabled = action.payload.enabled;

      return {
        ...state
      };

    case SET_SELECTORS:
      setSelectorPlugins(action.selectors, state.plugins);

      return {
        ...state,
        selectors: action.selectors
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
        const res = await getConfig();

        if (configValidator(res)) {
          dispatch({
            type: SET_CONFIG,
            plugins: res
          });
        } else {
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
        } else {
          throw new Error("Selector data is invalid: " + res);
        }
      }
      catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
}; 