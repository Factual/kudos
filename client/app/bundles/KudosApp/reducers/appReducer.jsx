import Immutable from 'immutable';

import actionTypes from '../constants/appConstants';

export const $$initialState = Immutable.fromJS({
  kudos: [], // this is the default state that would be used if one were not passed into the store
});

export default function appReducer($$state = $$initialState, action) {
  const { type, receiverEmail, messageBody } = action;

  switch (type) {
    case actionTypes.SERVER_RECEIVED_KUDO:
      newKudos = $$state.get('kudos') + [{ receiverEmail, messageBody }]
      return $$state.set('kudos', newKudos);
    default:
      return $$state;
  }
}
