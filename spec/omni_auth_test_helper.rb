module OmniAuthTestHelper
  def valid_google_login_setup
    if Rails.env.test?
      OmniAuth.config.test_mode = true
      OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
        provider: 'google',
        uid: '12345',
        info: {
          first_name: "William",
          last_name:  "Chang",
          email:      "william@factual.com"
        },
        credentials: {
          token: "wills_oauth_token",
          expires_at: Time.now + 1.week
        },
        extra: {
          raw_info: {
            gender: 'male'
          }
        }
      })
    end
  end
end
