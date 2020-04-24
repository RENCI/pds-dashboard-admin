import React, { useEffect, useReducer, createContext } from 'react';
import { configValidator } from '../validation/config.validation';

import axios from 'axios';
// import CONFIG_DATA from './config.data';

import { SET_CONFIG, TOGGLE_ENABLED } from './actionTypes';

const initialState = {
  plugins: []
};

const toggleEnabled = async (payload) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_STAGE_CONFIG}/${payload.piid}`, payload)
    if (res.status === 200) {
      console.log("Response: ", res.data)
      return res.data
    }
  } catch (error) {
    console.error(error)
  }
}

const getConfig = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_STAGE_CONFIG}?status=all`)
    if (res.status === 200) {
      console.log("Response: ", res.data)
      return res.data
    }
  } catch (error) {
    console.error(error)
  }
}

const configReducer = (state, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        plugins: action.plugins
        // plugins: CONFIG_DATA
      };
    case TOGGLE_ENABLED:
    toggleEnabled(action.payload)
      return {
        ...state
      };
    default:
      throw new Error("Invalid config action: " + action.type);
  }
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
    })();

  }, []);

  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
}; 