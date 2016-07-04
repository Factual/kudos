import { combineReducers } from 'redux';

import actionTypes from '../constants/appConstants';

export const initialState = {
  kudos: [], // this is the default state that would be used if one were not passed into the store
  error: null,
};


const kudos = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.SERVER_RECEIVED_KUDO:
      newKudos = state.concat(createKudo(action));
      return newKudos;
    default:
      return state;
  }
}

const createKudo = (action) => {
  const { receiverEmail, messageBody } = action;
  return { receiverEmail, messageBody };
}

const error = (state = null, action) => {
  const { type, error } = action

  if (type == actionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  } else {
    return state;
  };
}

const appReducer = combineReducers({
  kudos,
  error,
});

export default appReducer;
