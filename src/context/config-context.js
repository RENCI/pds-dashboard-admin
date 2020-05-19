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
    const res = await axios.post(`${process.env.REACT_APP_API_STAGE_CONFIG}/${payload.piid}`, payload)
    if (res.status === 200) {
      console.log("Enable Plugin Response: ", payload.piid)
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getConfig = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE_CONFIG}?status=all`)
    if (res.status === 200) {
      console.log("Config: ", res.data)
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getSelectors = async () => {
  try {
    const res = await axios.get(`http://pds.renci.org:8080/v1/plugin/pds/selectors`)
    if (res.status === 200) {
      console.log("Selectors: ", res.data)
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
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
      return {
        ...state
      };
    case SET_SELECTORS:
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