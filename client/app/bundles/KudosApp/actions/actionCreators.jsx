import actionTypes from '../constants/appConstants';

export function createKudo(receiverEmail) {
  return {
    type: actionTypes.CREATE_KUDO,
    receiverEmail,
  };
}
