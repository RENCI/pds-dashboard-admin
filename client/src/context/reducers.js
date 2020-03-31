import axios from 'axios';
import { GET_CONFIG, TOGGLE_ENABLED } from './actionTypes';

const getConfig = async () => {
  try {
    const res = await axios.get(process.env.REACT_APP_API_CONFIG)
    if ( res.status === 200 ) {
      return res.data
    }
  } catch (error) {
    console.error(error)
  }
}

const toggleEnabled = (plugin) => {
  console.log(plugin)
}

export const configReducer = (state, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return getConfig();
    case TOGGLE_ENABLED:
      return toggleEnabled(action.payload);
    default:
      return;
  }
};