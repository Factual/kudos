import { COLOR_CLASSES } from '../constants/appConstants'

const { TEAL, GREEN, ORANGE } = COLOR_CLASSES
const colorClasses = [TEAL, GREEN, ORANGE]
const maxIndex = colorClasses.length - 1

class ColorGenerator {
  constructor() {
    this.reset()
  }

  reset() {
    this.frontIndex = maxIndex
    this.backIndex = 0
  }

  appendFront() {
    if (this.frontIndex < 0) {
      this.frontIndex = maxIndex
    }

    const colorClass = colorClasses[this.frontIndex]
    this.frontIndex -= 1
    return colorClass
  }

  appendBack() {
    if (this.backIndex > maxIndex) {
      this.backIndex = 0
    }

    const colorClass = colorClasses[this.backIndex]
    this.backIndex += 1
    return colorClass
  }
}

export default new ColorGenerator()
