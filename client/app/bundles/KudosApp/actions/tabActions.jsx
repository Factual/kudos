import actionTypes from '../constants/appConstants';
import request from 'axios';
request.defaults.headers.post['Content-Type'] = 'application/json';

const showActiveTab = (newActiveTab) => {
  return {
    type: actionTypes.SET_ACTIVE_TAB,
    newActiveTab,
  }
}

const fetchKudosSuccess = kudos => ({ type: actionTypes.FETCH_KUDOS_SUCCESS, kudos: kudos })

const setActiveTab = (newActiveTab) => {
  return dispatch => {
    dispatch(showActiveTab(newActiveTab))
    dispatch({ type: actionTypes.FETCH_KUDOS_REQUEST })

    return request({
      method: 'GET',
      url: '/kudos',
      responseType: 'json',
      params: {
        limit: 10,
        tab: newActiveTab
      }
    }).then(res => {
      dispatch(fetchKudosSuccess(res.data.kudos))
    }).catch(err => {
      console.log(err)
      dispatch(fetchKudosFailure(err))
    })
  }

}

export { setActiveTab };
