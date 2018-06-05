import {actionTypes} from "../constants/appConstants";

const fetchEmails = (allEmails) => {
  return dispatch => {dispatch(getEmails(allEmails)) }
}

const getEmails = (allEmails) => {
  return {
    type: actionTypes.FETCH_ALL_EMAILS,
    allEmails
  }
}

export default fetchEmails;