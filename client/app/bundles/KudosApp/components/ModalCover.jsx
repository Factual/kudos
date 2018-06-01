import React, { PropTypes } from 'react';

const ModalCover = ({ showModal }) => {return showModal ? <div className="overlay"> </div> : null};

ModalCover.propTypes = {
  showModal: PropTypes.bool,
};

export default ModalCover;