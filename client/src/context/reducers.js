import axios from 'axios';
import { GET_CONFIG, TOGGLE_ENABLED } from './actionTypes';

const getConfig = async (state) => {
  try {
    const res = await axios.get(process.env.REACT_APP_API_CONFIG)
    if ( res.status === 200 ) {
      return {...state, plugins: res.data}
    }
  } catch (error) {
    console.error(error)
  }
}

export const configReducer = (state, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return getConfig(state);
    case TOGGLE_ENABLED:
      return { 
        ...state, 
        plugins: [...state.plugins]
      };
    default:
      return;
  }
};