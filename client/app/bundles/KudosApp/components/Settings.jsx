import React, { PropTypes } from 'react';
import { Toggle, RaisedButton } from 'material-ui';

import request from 'axios'

export default class Settings extends React.Component {
  static propTypes = {
    email_notifications: PropTypes.bool.isRequired,
    slack_notifications: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      email_notifications: this.props.email_notifications,
      slack_notifications: this.props.slack_notifications,
    }
  }

  onToggle = (e, checked) => {
    this.setState({[ e.target.name ]: checked})
  }
  
  updateSettings = () => {
    const { email_notifications, slack_notifications } = this.state
    request({
      url: '/users/settings',
      method: 'POST',
      data: {
        email_notifications,
        slack_notifications,
      }
    }).then( response => {
      alert(response.data.message)
    })
  }

  render() {
    return (
      <div className="kudo-pane">
        <h2 className="margin-below"> Notification Settings </h2>
        <Toggle
          label="Email notifications"
          name="email_notifications"
          className="margin-below"
          defaultToggled={ this.props.email_notifications }
          onToggle={ this.onToggle }
        />
        <Toggle
          label="Slack notifications"
          name="slack_notifications"
          className="margin-below"
          defaultToggled={ this.props.slack_notifications }
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
