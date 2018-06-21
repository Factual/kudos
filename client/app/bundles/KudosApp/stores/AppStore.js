import { action, observable } from 'mobx'
import { User } from '../models'
import { updateNotificationPreferences } from '../services/UserService'
import KudosStore from './KudosStore'
import EasterEggStore from './EasterEggStore'
import AllUsers from "../models/AllUsers";

class AppStore {
  @observable user = new User()
  @observable allUsers = new AllUsers()
  @observable error = ''

  kudosStore = KudosStore
  easterEggStore = EasterEggStore

  constructor() {
    KudosStore.fetchKudos('Recent')
  }

  @action
  loadClientData(props) {
    this.user = new User(props.user)
    this.allUsers = new AllUsers(props.allUsers)
  }

  @action
  toggleNotificationPreference(notifType) {
    this.user.notificationPreferences[notifType] = !this.user.notificationPreferences[notifType]
    updateNotificationPreferences(this.user.notificationPreferences)
  }

}

const APP_STORE = new AppStore()
export default APP_STORE
