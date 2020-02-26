import CONFIG_DEFAULT from './config.data';

const INITIAL_STATE = {
  plugins: CONFIG_DEFAULT
}

const configReducer = ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default configReducer;