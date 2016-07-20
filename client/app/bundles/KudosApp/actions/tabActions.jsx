import actionTypes from '../constants/appConstants';

const setActiveTab = (newActiveTab) => {
  return {
    type: actionTypes.SET_ACTIVE_TAB,
    newActiveTab,
  }
}

export { setActiveTab };
