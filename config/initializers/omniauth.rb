# frozen_string_literal: true
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
           ENV["G_OAUTH_ID"],
           ENV["G_OAUTH_SECRET"],
           access_type: 'online',
           hd: Settings.google_apps_domains
end
