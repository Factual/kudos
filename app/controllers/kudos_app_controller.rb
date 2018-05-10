# frozen_string_literal: true
class KudosAppController < ApplicationController
  def index
    @kudos_app_props = {
      id: current_user.id,
      name: current_user.name,
      allow_email_notifications: current_user.allow_email_notifications,
      allow_slack_notifications: current_user.allow_slack_notifications
    }
  end
end
