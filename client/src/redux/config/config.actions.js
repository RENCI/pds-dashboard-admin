import ConfigActionTypes from './config.actionTypes';

export const toggleEnabled = () => ({
  type: ConfigActionTypes.TOGGLE_ENABLED
})

export const getAllPlugins = plugins => ({
  type: ConfigActionTypes.GET_ALL_PLUGINS,
  payload: plugins
})
