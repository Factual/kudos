import actionTypes from '../constants/appConstants';
import request from 'axios';
request.defaults.headers.post['Content-Type'] = 'application/json';

// export function createKudo(receiverEmail) {
//   return {
//     type: actionTypes.CREATE_KUDO,
//     receiverEmail,
//   };
// }
const postedKudo = (receiverEmail, messageBody) => {
  return {
    type: actionTypes.POSTED_KUDO,
    receiverEmail,
    messageBody
  }
}

const serverReceivedKudo = (res) => {
  const receiverId = res.data.kudo.receiver_id
  const messageBody = res.data.kudo.body

  return {
    type: actionTypes.SERVER_RECEIVED_KUDO,
    receiverId,
    messageBody
  }
}

const serverRejectedKudo = (err) => {
  return {
    type: actionTypes.SERVER_REJECTED_KUDO,
    error: err.data.error,
  }
}

const resetErrorMessage = () => {
  return {
    type: actionTypes.RESET_ERROR_MESSAGE,
  }
}

const createKudo = (receiverEmail, messageBody, onSuccess = null, onFailure = null) => {
  return dispatch => {
    dispatch(postedKudo(receiverEmail, messageBody));
    dispatch(resetErrorMessage());

    // TODO: factor into a request/post library
    return request({
      method: 'POST',
      url: '/kudos.json',
      responseType: 'json',
      // headers: {
      //   'X-CSRF-Token': Config.getCSRFToken(),
      // },
      data: {
        kudo: {
          receiver_email: receiverEmail,
          body: messageBody,
        }
      },
    }).then(res => {
      console.log(res)
      if (onSuccess) {
        onSuccess(res);
      }
      dispatch(serverReceivedKudo(res));
    }).catch(err => {
      console.log(err)
      if (onFailure) {
        onFailure(err);
      }
      dispatch(serverRejectedKudo(err))
    });
  };
};

export { createKudo }
