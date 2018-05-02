# frozen_string_literal: true
class UsersController < ApplicationController
  def search
    results = User.fuzzy_search(params[:q])
                  .as_json(only: [:id, :name, :email, :avatar])
    render json: results
  end

  # update user's notification settings
  def update
    if !params[:email_notifications].nil?
      current_user.email_notifications = params[:email_notifications]
    end

    if !params[:slack_notifications].nil?
      current_user.slack_notifications = params[:slack_notifications]
    end

    if current_user.save
      render json: { message: "Notification settings have been updated!" }, status: :accepted
    else
      render json: { error: "Notification settings could not be updated. Please try again later." }, status: 500
    end
  end
end
