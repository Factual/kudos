import React, { PropTypes } from 'react';

const ModalCover = ({ activateModal }) => {return activateModal ? <div className="overlay"> </div> : null};

ModalCover.propTypes = {
  activateModal: PropTypes.bool,
};

export default ModalCover;