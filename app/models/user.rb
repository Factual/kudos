# frozen_string_literal: true
# == Schema Information
#
# Table name: users
#
#  id                   :uuid          not null, primary key
#  provider             :string
#  uid                  :string
#  name                 :string
#  oauth_token          :string
#  oauth_expires_at     :datetime
#  created_at           :datetime      not null
#  updated_at           :datetime      not null
#  email                :string
#  avatar               :string
#  email_notifications  :boolean       default is true
#

class User < ApplicationRecord
  validates :name, presence: true

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid).to_hash).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.avatar = auth.info.image
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.zone.at(auth.credentials.expires_at)
      user.save!
    end
  end

  def self.fuzzy_search(query)
    where("similarity(name || email, ?) > 0", query)
      .order("similarity(name || email, #{ActiveRecord::Base.connection.quote(query)}) DESC")
  end
end
