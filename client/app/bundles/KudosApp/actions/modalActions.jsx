import { actionTypes } from "../constants/appConstants";

function modalSwitch(showModal) {
  return {
    type: actionTypes.MODAL_SWITCH,
    showModal
  }
}

const fetchUsers = (users) => {
  return dispatch => {dispatch(getUsers(users))}
}

const getUsers = (allUsers) => {
  return {
    type: actionTypes.FETCH_ALL_USERS,
    allUsers,
  }
}

export { modalSwitch, fetchUsers };

