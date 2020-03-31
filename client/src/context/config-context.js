import React, { useReducer } from 'react';
import { configReducer } from './reducers';
import SAMPLE_PLUGINS from './config.data';

const initialState = {
    plugins: SAMPLE_PLUGINS
};

const ConfigContext = React.createContext(initialState);

const ConfigProvider = props => {
  const [state, dispatch] = useReducer(configReducer, initialState)
  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ConfigContext.Provider>
  )
  }
export { ConfigContext, ConfigProvider };