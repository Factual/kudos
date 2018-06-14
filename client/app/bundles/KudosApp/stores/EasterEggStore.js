import { action, observable } from 'mobx'

class EasterEggStore {
  @observable superKudoMode = false
  @observable easterEggPunchVisible = false
  @observable flashKudo = false

  @action
  toggleSuperKudoMode = () => {
    this.superKudoMode = !this.superKudoMode
  }

  @action
  // show then remove after 3 seconds (length of animation)
  showEasterEggPunch = () => {
    this.easterEggPunchVisible = true
    setTimeout(() => {
      this.easterEggPunchVisible = false
    }, 3000)
  }
}

export default new EasterEggStore()
