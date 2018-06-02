import {actionTypes} from "../constants/appConstants";
import request from 'axios';

const fetchEmails = (emails, onSuccess = null, onFailure = null) => {
  return dispatch => {dispatch(getEmails(emails)) }
}

const getEmails = (emails) => {
  return {
    type: actionTypes.FETCH_EMAILS,
    emails
  }
}

export default fetchEmails;