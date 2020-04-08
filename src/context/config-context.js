import React, { useEffect, useReducer, createContext } from 'react';

import axios from 'axios';

import { SET_CONFIG, TOGGLE_ENABLED } from './actionTypes';

const initialState = {
  plugins: []
};

const configReducer = (state, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        plugins: action.plugins
      };
    case TOGGLE_ENABLED:
      return {
        ...state,
        plugins: action.plugins
      };
    default:
      throw new Error("Invalid config action: " + action.type);
  }
};

export const ConfigContext = createContext(initialState);

export const ConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, initialState);

  const getConfig = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_CONFIG}?status=all`)
      if (res.status === 200) {
        console.log("Response: ", res.data)
        return res.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleEnabled = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_CONFIG}?status=all`)
      if (res.status === 200) {
        console.log("Response: ", res.data)
        return res.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await getConfig();

        dispatch({
          type: SET_CONFIG,
          plugins: res
        });
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