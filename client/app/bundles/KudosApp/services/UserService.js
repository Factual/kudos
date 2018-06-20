import request from 'axios'

export async function updateNotificationPreferences(preferences) {
  const resp = await request({
    url: '/users/settings',
    method: 'POST',
    data: {
      allow_email_notifications: preferences.email,
      allow_slack_notifications: preferences.slack,
    },
  })

  return resp
}
