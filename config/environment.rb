# frozen_string_literal: true
# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# Set up ActionMailer for SMTP

ActionMailer::Base.smtp_settings = {
  :address        => ENV["SMTP_SERVER"],
  :domain         => ENV["EMAIL_DOMAIN"],
  :port           => 587,
  :user_name      => ENV["EMAIL_USERNAME"],
  :password       => ENV["EMAIL_PASSWORD"],
  :authentication => :plain,
  :enable_starttls_auto => true
}
