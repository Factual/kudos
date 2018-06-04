import { action, observable } from 'mobx'

class EasterEggStore {
  @observable superKudoMode = false

  @action
  toggleSuperKudoMode = () => {
    this.superKudoMode = !this.superKudoMode
  }
}

export default new EasterEggStore()
