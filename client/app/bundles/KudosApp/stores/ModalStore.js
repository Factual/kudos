import { action, observable } from 'mobx'
import { User } from '../models'
import { updateNotificationPreferences } from '../services/UserService'
import KudosStore from './KudosStore'
import EasterEggStore from './EasterEggStore'
import AllUsers from "../models/AllUsers";

class ModalStore {
  @observable showModal = false

  constructor() {
  }

  @action
  modalSwitch() {
    this.showModal = !this.showModal;
  }
}

const MODAL_STORE = new ModalStore()
export default MODAL_STORE