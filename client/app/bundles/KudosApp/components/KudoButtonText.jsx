import React, { PropTypes } from 'react';

const KudoButtonText = ({ text }) => {
  return <span>
    <span className="fist-left">🤜</span>
    <span className="fist-right">🤛</span>
    <span className="title">{text}</span>
  </span>

}

KudoButtonText.propTypes = {
  text: PropTypes.string,
};

export default KudoButtonText;
