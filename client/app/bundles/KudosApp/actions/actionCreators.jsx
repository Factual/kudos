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
  const receiverEmail = res.receiver_email
  const messageBody = res.body

  return {
    type: actionTypes.SERVER_RECEIVED_KUDO,
    receiverEmail,
    messageBody
  }
}

const serverRejectedKudo = (err) => {
  return {
    type: actionTypes.SERVER_REJECTED_KUDO,
    error: err.data.errors,
  }
}


const createKudo = (receiverEmail, messageBody) => {
  return dispatch => {
    dispatch(postedKudo(receiverEmail, messageBody));

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
      dispatch(serverReceivedKudo(res));
    }).catch(err => {
      console.log(err)
      dispatch(serverRejectedKudo(err))
    });
  };
};

export { createKudo }
