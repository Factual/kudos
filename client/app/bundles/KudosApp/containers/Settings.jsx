import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from '../components/Settings'

function mapStateToProps({ kudosAppStore }) {
  const {
    user: {
      id,
      name,
      email_notifications,
      slack_notifications
    }
  } = kudosAppStore
  return {
    id,
    name,
    email_notifications,
    slack_notifications
  }
}

class SettingsContainer extends connect(mapStateToProps, null)(Settings) {
}

export default SettingsContainer
