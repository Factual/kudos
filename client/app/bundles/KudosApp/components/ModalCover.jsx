import React, { PropTypes } from 'react'
import AppStore from '../stores/AppStore'

const ModalCover = () => {
  return AppStore.showModal ? (
    <div onClick={MODAL_STORE.toggleModal} className="overlay">
      {' '}
    </div>
  ) : null
}

ModalCover.propTypes = {
  showModal: PropTypes.bool,
}

export default ModalCover
