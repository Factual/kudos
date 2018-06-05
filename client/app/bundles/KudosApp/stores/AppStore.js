import { action, observable } from 'mobx'
import { User } from '../models'
import KudosStore from './KudosStore'

class AppStore {
  @observable user = new User()
  @observable error = ''

  kudosStore = KudosStore

  constructor() {
    KudosStore.fetchKudos('Recent')
  }

  @action
  loadClientData(props) {
    this.user = new User(props.user)
  }
}

const APP_STORE = new AppStore()
export default APP_STORE
