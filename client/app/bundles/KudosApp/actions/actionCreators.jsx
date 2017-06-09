import actionTypes from '../constants/appConstants'
import request from 'axios'
import _ from 'lodash'
request.defaults.headers.post['Content-Type'] = 'application/json'

const postedKudo = (receiverEmail, messageBody) => {
  return {
    type: actionTypes.POSTED_KUDO,
    receiverEmail,
    messageBody
  }
}

const updatedKudo = ( kudoId, newMessage ) => {
  console.log("Updated Kudo Action")
  console.log("Kudo ID:", kudoId)
  console.log("New Message:", newMessage)
  return {
    type: actionTypes.UPDATED_KUDO,
    kudoId,
    newMessage
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

const addLike = (kudoId, giverId, giverName) => {
  return {
    type: actionTypes.SERVER_ACCEPTED_LIKE,
    giverId,
    giverName,
    kudoId
  }
}

const removeLike = (kudoId, giverId, giverName) => {
  return {
    type: actionTypes.SERVER_ACCEPTED_UNLIKE,
    giverId,
    giverName,
    kudoId
  }
}

const failedLike = (error) => {
  return {
    type: actionTypes.SERVER_REJECTED_LIKE,
    error: error.data.error
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
    dispatch(postedKudo(receiverEmail, messageBody))
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
    })
  }
}

const editKudo = ( id, message, onSuccess = null, onFailure = null ) => {
  console.log("In the edit kudo handler");
  console.log("Id is", id);
  console.log("Message is", message);
  return dispatch => {
    dispatch(updatedKudo( id, message ))
    dispatch(resetErrorMessage());

    return request({
      method: 'PATCH',
      url: '/kudos/'+id,
      responseType: 'json',
      data: {
        kudo: {
          id: id,
          body: message,
        }
      },
    }).then(res => {
      console.log("Made the Edit! Here's the Response:")
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
    })
  }
}

const initialize = ({ id, name }) => {
  return {
    type: actionTypes.INITIALIZE,
    id,
    name
  }
}

export {
  initialize,
  createKudo,
  editKudo,
  addLike,
  removeLike,
  failedLike
}
