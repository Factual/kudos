class User < ApplicationRecord
  def self.from_omniauth(auth)
    return false unless is_internal_account?(auth)
    where(auth.slice(:provider, :uid).to_hash).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.avatar = auth.info.image
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  private

  def self.is_internal_account?(auth)
    Settings.google_apps_domains.each do |domain|
      return true if domain == auth.extra.id_info.hd
    end
    false
  end
end
