import React, { PropTypes } from 'react'
import _ from 'lodash'
import request from 'axios'

const Settings = ({ name, id, email_notifications }) => {console.log('please work'); return (
  <div>
    <p>Name: {name}</p>
    <p>ID: {id}</p>
    <p>Email notifications is currently set to: {`${email_notifications}`}</p>
  </div>
)}

Settings.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  email_notifications: PropTypes.bool.isRequired,
}

export default Settings
