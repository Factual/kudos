import { action, observable } from 'mobx'
import { User } from '../models'
import { updateNotificationPreferences } from '../services/UserService'
import KudosStore from './KudosStore'
import EasterEggStore from './EasterEggStore'

class AppStore {
  @observable user = new User()
  @observable allUsers = []
  @observable error = ''
  @observable showModal = false

  kudosStore = KudosStore
  easterEggStore = EasterEggStore

  @action
  loadClientData(props) {
    this.user = new User(props.user)
    this.allUsers = props.allUsers
    this.kudosStore.filters = props.filters

    KudosStore.fetchKudos('Recent')
  }

  @action
  toggleNotificationPreference(notifType) {
    this.user.notificationPreferences[notifType] = !this.user.notificationPreferences[notifType]
    updateNotificationPreferences(this.user.notificationPreferences)
  }

  @action
  toggleModal() {
    this.showModal = !this.showModal
  }
}

const APP_STORE = new AppStore()
export default APP_STORE
