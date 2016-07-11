import { combineReducers } from 'redux';
import _ from 'lodash';

import actionTypes from '../constants/appConstants';

export const initialState = {
  kudos: [], // this is the default state that would be used if one were not passed into the store
  error: null,
};


const kudos = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.SERVER_RECEIVED_KUDO:
      return state.concat(createKudo(action));
    default:
      return state;
  }
}

const createKudo = (action) => {
  return _.pick(action, ['receiverId', 'messageBody']);
}

const error = (state = null, action) => {
  const { type, error } = action

  if (type == actionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  } else {
    return state;
  };
}

const appReducer = combineReducers({
  kudos,
  error,
});

export default appReducer;
