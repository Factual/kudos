import { actionTypes } from "../constants/appConstants";

function modalSwitch(showModal) {
  return {
    type: actionTypes.MODAL_SWITCH,
    showModal
  }
}

export default modalSwitch;

