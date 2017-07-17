# frozen_string_literal: true
class UsersController < ApplicationController
  def search
    results = User.fuzzy_search(params[:q])
                  .as_json(only: [:id, :name, :email, :avatar])
    render json: results
  end

  def update

    if params[:email_notifications] == 'subscribe'
      response = true
    elsif params[:email_notifications] == 'unsubscribe'
      response = false
    else
      return render json: { error: "Incorrect parameter for email notifications." }, status: :bad_request
    end

    if current_user.update(email_notifications: response)
      byebug
      render json: { email_notifications: current_user.email_notifications }, status: :accepted
    else
      render json: { error: current_user.email_notifications.errors.messages.values.flatten.to_sentence }, status: :unprocessable_entity
    end

  end
end
