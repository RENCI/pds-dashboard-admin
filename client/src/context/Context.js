import React from 'react';
import CONFIG_DEFAULT from './config.data';

const INITIAL_STATE = {
  plugins: CONFIG_DEFAULT
}

const ConfigContext = React.createContext(INITIAL_STATE);

const ConfigProvider = props => (
  <ConfigContext.Provider value={INITIAL_STATE}>
    {props.children}
  </ConfigContext.Provider>
)

export { ConfigContext, ConfigProvider };