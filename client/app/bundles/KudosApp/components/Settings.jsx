import React, { PropTypes } from 'react';
import { Switch, Button } from 'material-ui';
import request from 'axios'

export default class Settings extends React.Component {
  static propTypes = {
    allow_email_notifications: PropTypes.bool.isRequired,
    allow_slack_notifications: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      allow_email_notifications: this.props.allow_email_notifications,
      allow_slack_notifications: this.props.allow_slack_notifications,
    }
  }

  onSwitch = (e) => {
    this.setState({[ e.target.name ]: e.target.checked})
  }

  updateSettings = () => {
    const { allow_email_notifications, allow_slack_notifications } = this.state
    request({
      url: '/users/settings',
      method: 'POST',
      data: {
        allow_email_notifications,
        allow_slack_notifications,
      }
    }).then( response => {
      alert(response.data.message)
    }).catch( error => {
      alert(error.data.error)
    })
  }

  render() {
    return (
      <div className="settings__container">
        <h3 className="margin-below"> Notification Settings </h3>
        <div className="settings__input-row margin-below">
        Email notifications
        <Switch
          name="allow_email_notifications"
          checked={ this.state.allow_email_notifications }
          onChange={ this.onSwitch }
          color="primary"
        />
        </div>
        <div className="settings__input-row margin-below">
        Slack notifications
        <Switch
          name="allow_slack_notifications"
          checked={ this.state.allow_slack_notifications }
          onChange={ this.onSwitch }
          color="primary"
        />
        </div>
        <Button
          variant="raised"
          onClick={ this.updateSettings }
          color="primary">
          Save
        </Button>
      </div>
    )
  }
}
