# frozen_string_literal: true
class KudosAppController < ApplicationController
  def index
    @kudos_app_props = {
      user: current_user.slice(:id, :email, :name, :avatar),
      allow_email_notifications: current_user.allow_email_notifications,
      allow_slack_notifications: current_user.allow_slack_notifications,
      allUsers: User.fetch_all_users,
    }
  end
end
