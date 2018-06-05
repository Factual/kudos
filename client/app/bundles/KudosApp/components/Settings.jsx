import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import { Switch, Button } from 'material-ui'
import request from 'axios'
import AppStore from '../stores/AppStore'

@observer
export default class Settings extends React.Component {
  render() {
    return (
      <div className="settings__container">
        <h3 className="margin-below"> Notification Settings </h3>
        <div className="settings__input-row margin-below">
          Email notifications
          <Switch
            name="allow_email_notifications"
            checked={AppStore.user.notificationPreferences.email}
            onChange={() => AppStore.toggleNotificationPreference('email')}
            color="primary"
          />
        </div>
        <div className="settings__input-row margin-below">
          Slack notifications
          <Switch
            name="allow_slack_notifications"
            checked={AppStore.user.notificationPreferences.slack}
            onChange={() => AppStore.toggleNotificationPreference('slack')}
            color="primary"
          />
        </div>
      </div>
    )
  }
}
