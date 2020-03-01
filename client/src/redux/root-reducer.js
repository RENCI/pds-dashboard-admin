import { combineReducers } from 'redux';

import configReducer from './config/config.reducer';

const rootReducer = combineReducers({
  config: configReducer
})

export default rootReducer;