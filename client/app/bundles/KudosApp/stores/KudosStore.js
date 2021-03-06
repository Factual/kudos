import { findIndex, last } from 'lodash'
import { action, computed, observable } from 'mobx'
import { getKudos, postKudo, patchKudo, postLike, postUnlike } from '../services/KudosService'
import ColorGenerator from '../utils/colorGenerator'

const DEFAULT_KUDOS_LIST = { kudos: [], total: 0, page: 0 }
const NOT_FOUND = -1

class KudosStore {
  @observable currentTab = 'Recent'
  @observable isFetchingKudos = false
  @observable kudos = []
  @observable total = 0
  @observable cursorTime
  @observable
  filters = {
    recipient: '',
    from: '',
    to: '',
  }

  @computed
  get canLoadMore() {
    return this.kudos.length < this.total
  }

  @action
  setCurrentTab(tab) {
    this.currentTab = tab
    this.resetKudos()
  }

  @action
  async fetchKudos() {
    try {
      this.isFetchingKudos = true
      const { kudos, total } = await getKudos(this.currentTab, this.cursorTime, this.filters)
      this.appendKudos({ kudos, total })
      this.isFetchingKudos = false
    } catch (e) {
      console.error(
        `Failed to fetch kudos for tab ${this.currentTab} at cursor time ${this.cursorTime}`
      )
      console.error(e)
    }
  }

  @action
  async resetKudos() {
    this.kudos = []
    this.total = 0
    this.cursorTime = undefined
    ColorGenerator.reset()
    this.fetchKudos()
  }

  @action
  async newKudo(receiverEmails, body) {
    try {
      const kudo = await postKudo(receiverEmails, body)
      kudo.colorClass = ColorGenerator.appendFront()
      this.kudos = [kudo, ...this.kudos]
      this.total += 1
    } catch (e) {
      console.error(`Failed to create kudo for ${receiverEmails} with body ${body}`)
      console.error(e)
    }
  }

  @action
  async editKudo(kudoId, message) {
    try {
      const newKudo = await patchKudo(kudoId, message)
      const i = this.findKudoIndex(kudoId)
      if (i !== NOT_FOUND) {
        this.kudos[i].body = newKudo.body
      }
    } catch (e) {
      console.error(`Failed to edit kudo ${kudoId} with message ${message}`)
      console.error(e)
    }
  }

  @action
  async likeKudo(kudoId) {
    try {
      const newLike = await postLike(kudoId)
      const i = this.findKudoIndex(kudoId)
      if (i !== NOT_FOUND) {
        this.kudos[i].likes.push(newLike)
      }
    } catch (e) {
      console.error(`Failed to toggle like for kudo ${kudoId}`)
      console.error(e)
    }
  }

  @action
  async unlikeKudo(kudoId, userId) {
    try {
      const unliked = await postUnlike(kudoId)
      if (unliked) {
        const i = this.findKudoIndex(kudoId)
        if (i !== NOT_FOUND) {
          this.kudos[i].likes = this.kudos[i].likes.filter(like => like.giver_id !== userId)
        }
      }
    } catch (e) {
      console.error(`Failed to toggle like for kudo ${kudoId}`)
      console.error(e)
    }
  }

  @action
  appendKudos({ kudos, total } = {}) {
    kudos.forEach(kudo => {
      kudo.colorClass = ColorGenerator.appendBack()
    })

    this.kudos = this.kudos.concat(kudos)
    this.cursorTime = last(kudos).givenAt

    if (total > 0) {
      this.total = total
    }
  }

  findKudoIndex(id) {
    return findIndex(this.kudos, kudo => kudo.id === id)
  }
}

export default new KudosStore()
