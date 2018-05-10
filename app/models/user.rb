# frozen_string_literal: true
# == Schema Information
#
# Table name: users
#
#  id                         :uuid          not null, primary key
#  provider                   :string
#  uid                        :string
#  name                       :string
#  oauth_token                :string
#  oauth_expires_at           :datetime
#  created_at                 :datetime      not null
#  updated_at                 :datetime      not null
#  email                      :string
#  avatar                     :string
#  allow_email_notifications  :boolean       default is true
#  allow_slack_notifications  :boolean       default is true
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

  # Send notification(s) of received Kudos, if User has requested in Settings
  def notify
    send_email_notification if allow_email_notifications
    send_slack_notification if allow_slack_notifications
  end

  private

  def send_email_notification
    ReceivedKudosMailer.received_kudos_notification(self).deliver_later
  end

  # Sends a direct message to Slack user to notify of new Kudos
  def send_slack_notification
    kudosbot = Slack::Web::Client.new

    begin
      slack_user = kudosbot.users_lookupByEmail(email: email).user
      user_id = slack_user['id']
      user_name = slack_user['name']

      im = kudosbot.im_open({user: user_id, return_im: true})
      kudosbot.chat_postMessage(
        channel: im.channel.id,
        text: "Hey @#{user_name}! You just received some Kudos on #{ENV['SITE_BASE_URL']}",
        as_user: true,
        "link_names": 1
      )
      kudosbot.im_close(channel: im.channel.id)
    rescue Slack::Web::Api::Errors::SlackError
      # Factual Slack account not found
      update({ allow_slack_notifications: false })
      SlackUserNotFoundMailer.slack_error_notification(self).deliver_later
    end
  end
end
