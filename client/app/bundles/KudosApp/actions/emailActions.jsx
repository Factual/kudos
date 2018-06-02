import {actionTypes} from "../constants/appConstants";

const fetchEmails = (emails, onSuccess = null, onFailure = null) => {
  return dispatch => {
    return request({
      method: 'GET',
      url: `/users/gather`,
      responseType: 'json',
      data: {
        emails: emails,
      }
    })
      .then(res => {
        if (onSuccess) {
          onSuccess(res)
        }
        dispatch(getEmails(emails))
      })
      .catch(err => {
        if (onFailure) {
          onFailure(err)
        }
      })
  }
}

const getEmails = (emails) => {
  return {
    type: actionTypes.FETCH_EMAILS,
    emails
  }
}

export default fetchEmails;