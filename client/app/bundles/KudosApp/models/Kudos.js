import { findIndex } from 'lodash'

export class Kudos {
  constructor({ tab, kudos, total } = {}) {
    if (tab) {
      this.appendKudos(tab, { kudos, total })
    }
  }

  currentPage(tab) {
    return this.allKudos[tab].page
  }
}

export default Kudos
