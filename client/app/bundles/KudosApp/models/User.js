import { get, merge } from 'lodash'

const DEFAULT_USER = {
  id: '',
  email: '',
  name: '',
  allow_slack_notifications: false,
  allow_email_notifications: false,
}

export class User {
  id
  email
  name
  avatar
  notificationPreferences

  constructor(user = DEFAULT_USER) {
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.avatar = user.avatar
    this.notificationPreferences = {
      slack: user.allow_slack_notifications || false,
      email: user.allow_email_notifications || false,
    }
  }
}

export default User
