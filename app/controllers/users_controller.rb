# frozen_string_literal: true
class UsersController < ApplicationController
  def search
    results = User.fuzzy_search(params[:q])
                  .as_json(only: [:id, :name, :email, :avatar])
    render json: results
  end

  # update user's notification settings
  def update
    if current_user.update(params.permit(:allow_email_notifications, :allow_slack_notifications))
      render json: { message: "Notification settings have been updated!" }, status: :accepted
    else
      render json: { error: "Notification settings could not be updated. Please try again later." }, status: 500
    end
  end
end
