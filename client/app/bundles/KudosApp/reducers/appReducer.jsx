import { combineReducers } from 'redux';
import _ from 'lodash';

import actionTypes from '../constants/appConstants';

export const initialState = {
  kudos: [], // this is the default state that would be used if one were not passed into the store
  error: null,
  currentTab: 'Recent',
  isFetchingKudos: false,
  totalKudos: 0,
  user: { name: '', id: '', email_notifications: true }
}

function getKudo(kudos, kudoId) {
  let matchingKudo = null
  _.forEach(kudos, (kudo, index) => {
    if (kudo.id === kudoId) {
      matchingKudo = { ...kudo }
      kudos[index] = matchingKudo
      return
    }
  })

  return matchingKudo
}

const emailNotifications = (state = true, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.SERVER_ACCEPTED_EMAIL_SUBSCRIBE:
      return true
    case actionTypes.SERVER_ACCEPTED_EMAIL_UNSUBSCRIBE:
      return false
    default:
      return state
  }
}

const kudos = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.FETCH_KUDOS_REQUEST:
      if (action.append) {
        return state
      } else {
        return []
      }
    case actionTypes.SERVER_RECEIVED_KUDO:
      return state.concat(createKudo(action));
    case actionTypes.FETCH_KUDOS_SUCCESS:
      if (action.append) {
        return state.concat(action.kudos); // append the next page
      } else {
        return action.kudos // clobber anything in the existing store
      }
    case actionTypes.SERVER_ACCEPTED_LIKE:
    case actionTypes.SERVER_ACCEPTED_UNLIKE:
      const newKudos = [...state]
      const { giverId, giverName, kudoId } = action

      const matchingKudo = getKudo(newKudos, kudoId)

      if (type === actionTypes.SERVER_ACCEPTED_LIKE) {
        matchingKudo.likes = matchingKudo.likes.concat({
          giver: giverName,
          giver_id: giverId
        })
      } else {
        matchingKudo.likes = [...matchingKudo.likes]

        _.remove(matchingKudo.likes, like => {
          return like.giver_id === giverId
        })
      }

      return newKudos
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

const currentTab = (state = 'Recent', action) => {
  const { type, newActiveTab } = action

  if (type == actionTypes.SET_ACTIVE_TAB) {
    return newActiveTab
  } else {
    return state
  }
}

const isFetchingKudos = (state = false, action) => {
  const { type } = action
  if (type == actionTypes.FETCH_KUDOS_REQUEST) {
    return true
  } else if ([actionTypes.FETCH_KUDOS_SUCCESS, actionTypes.FETCH_KUDOS_FAILURE].includes(type)) {
    return false
  } else {
    return state
  }
}

const totalKudos = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.FETCH_KUDOS_REQUEST:
      return 0
    case actionTypes.FETCH_KUDOS_SUCCESS:
      return action.totalKudos
    default:
      return state
  }
}

const initialize = (state = { name: '', id: '', email_notifications: true }, action) => {
  if (action.type === actionTypes.INITIALIZE) {
    return {
      id: action.id,
      name: action.name,
      email_notifications: action.email_notifications
    }
  }
  return state
}

const appReducer = combineReducers({
  kudos,
  error,
  currentTab,
  isFetchingKudos,
  totalKudos,
  emailNotifications,
  user: initialize
});

export default appReducer;
