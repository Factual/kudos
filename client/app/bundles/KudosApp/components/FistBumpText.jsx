import React, { PropTypes } from 'react'

const FistBumpText = ({ text }) => {
  return (
    <span>
      <span className="fist-left">🤜</span>
      <span className="fist-right">🤛</span>
      <span className="title">{text}</span>
    </span>
  )
}

FistBumpText.propTypes = {
  text: PropTypes.string,
}

export default FistBumpText
