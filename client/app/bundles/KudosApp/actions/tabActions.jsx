import actionTypes from '../constants/appConstants';
import request from 'axios';
request.defaults.headers.post['Content-Type'] = 'application/json';

const showActiveTab = (newActiveTab) => {
  return {
    type: actionTypes.SET_ACTIVE_TAB,
    newActiveTab,
  }
}

const fetchKudosSuccess = (kudos, totalKudos, append = false) => ({
  type: actionTypes.FETCH_KUDOS_SUCCESS,
  kudos,
  totalKudos,
  append
})

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
      dispatch(fetchKudosSuccess(res.data.kudos, res.data.total))
    }).catch(err => {
      console.log(err)
      dispatch(fetchKudosFailure(err))
    })
  }
}

const fetchPage = (currentTab, offset) => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_KUDOS_REQUEST })

    return request({
      method: 'GET',
      url: '/kudos',
      responseType: 'json',
      params: {
        limit: 10,
        tab: currentTab,
        offset: offset
      }
    }).then(res => {
      dispatch(fetchKudosSuccess(res.data.kudos, res.data.total, true))
    }).catch(err => {
      console.log(err)
      dispatch(fetchKudosFailure(err))
    })
  }
}

export { setActiveTab, fetchPage };
