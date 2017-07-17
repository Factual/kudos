# frozen_string_literal: true
# Load the Rails application.
require_relative 'application'

# Slack client for Ruby
require 'slack-ruby-client'

# Initialize the Rails application.
Rails.application.initialize!

# Set up ActionMailer for SMTP

# Default values for port, authentication and enable_starttls_auto
DEFAULT_SMTP_PORT = 587
DEFAULT_SMTP_AUTH = :plain
DEFAULT_STARTTLS_AUTO = true

ActionMailer::Base.smtp_settings = {
  address:              ENV["SMTP_SERVER"],
  domain:               ENV["EMAIL_DOMAIN"],
  port:                 587,
  user_name:            ENV["EMAIL_USERNAME"],
  password:             ENV["EMAIL_PASSWORD"],
  authentication:       :plain,
  enable_starttls_auto: true
}

# Configure the slack client
Slack.configure do |config|
  config.token = ENV['SLACK_API_TOKEN']
  fail 'Missing ENV[SLACK_API_TOKEN]!' unless config.token
end
