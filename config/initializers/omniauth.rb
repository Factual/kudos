Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
    Settings.google_oauth.client_id,
    Settings.google_oauth.client_secret,
    {
      access_type: 'online',
      hd: Settings.google_apps_domains
    }
end
