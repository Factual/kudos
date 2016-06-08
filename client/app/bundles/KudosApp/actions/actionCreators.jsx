import actionTypes from '../constants/appConstants';
import request from 'axios';
request.defaults.headers.post['Content-Type'] = 'application/json';

// export function createKudo(receiverEmail) {
//   return {
//     type: actionTypes.CREATE_KUDO,
//     receiverEmail,
//   };
// }
const postKudo = (receiverEmail) => {
  return {
    type: actionTypes.POST_KUDO,
    receiverEmail
  }
}

const createKudo = (receiverEmail) => {
  return dispatch => {
    dispatch(postKudo(receiverEmail));

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
          body: 'test body',
        }
      },
    }).then(res => {
      console.log(res)
      // dispatch(serverReceivedKudo();
    }).catch(err => {
      console.log(err)
      // dispatch(serverRejectedKudo())
    });
  };
};

export { createKudo }
