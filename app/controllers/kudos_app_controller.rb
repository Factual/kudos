# frozen_string_literal: true
class KudosAppController < ApplicationController
  def index
    @kudos_app_props = {
      user: current_user.slice(:id, :email, :name, :avatar, :allow_email_notifications, :allow_slack_notifications),
      allUsers: User.pluck(:name, :email),
      filters: {
        recipient: params[:recipient],
        from: params[:from],
        to: params[:to]
      }
    }
  end
end
