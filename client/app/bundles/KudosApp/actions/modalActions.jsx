import { actionTypes } from "../constants/appConstants";

function modalSwitch(activateModal) {
  return {
    type: actionTypes.MODAL_SWITCH,
    activateModal
  }
}

export default modalSwitch;

