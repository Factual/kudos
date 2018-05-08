import React, { PropTypes } from 'react';
import { Toggle, RaisedButton } from 'material-ui';
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

  onToggle = (e, checked) => {
    this.setState({[ e.target.name ]: checked})
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
      <div className="kudo-pane">
        <h3 className="margin-below"> Notification Settings </h3>
        <Toggle
          label="Email notifications"
          name="allow_email_notifications"
          className="margin-below"
          defaultToggled={ this.props.allow_email_notifications }
          onToggle={ this.onToggle }
        />
        <Toggle
          label="Slack notifications"
          name="allow_slack_notifications"
          className="margin-below"
          defaultToggled={ this.props.allow_slack_notifications }
          onToggle={ this.onToggle }
        />
        <RaisedButton
          label="Save"
          onClick={ this.updateSettings }
        />
      </div>
    )
  }
}
