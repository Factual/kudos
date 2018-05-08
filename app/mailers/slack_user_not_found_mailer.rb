class SlackUserNotFoundMailer < ApplicationMailer

  def slack_error_notification(receiver)
    @receiver = receiver
    @kudos_settings_url = ENV["SITE_SETTINGS_URL"]
    @github_repo_url = ENV["GITHUB_REPO_URL"]
    mail(to: @receiver.email, subject: "Slack account not found!")
  end

end
