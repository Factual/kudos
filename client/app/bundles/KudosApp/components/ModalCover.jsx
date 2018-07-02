import React, { PropTypes } from 'react'
import AppStore from '../stores/AppStore'
import { observer } from 'mobx-react'

@observer
export default class ModalCover extends React.Component {
  render() {
    return AppStore.showModal ? (
      <div onClick={() => AppStore.toggleModal()} className="overlay" />
    ) : null
  }
}

ModalCover.propTypes = {
  showModal: PropTypes.bool,
}
