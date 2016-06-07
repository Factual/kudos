class User < ApplicationRecord
  def self.from_omniauth(auth)
    return false unless has_internal_email(auth.info.email)
     where(auth.slice(:provider, :uid).to_hash).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  private

  def self.has_internal_email(email)
    Settings.email_domains.each do |domain|
      return true if email.ends_with? "@#{domain}"
    end
    false
  end
end
