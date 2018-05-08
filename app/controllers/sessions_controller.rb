# frozen_string_literal: true
class SessionsController < ApplicationController
  skip_before_action :require_logged_in_user, only: [:create, :new]

  def new
  end

  def create
    user = User.from_omniauth(env["omniauth.auth"])
    if user
      session[:user_id] = user.id
      merge_user_accounts
    else
      flash[:error] = "Doesn't look like you're an internal user. Try logging in with another account."
    end
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private

  def merge_user_accounts
    provisional_accounts =
      User.where(email: current_user.email).where.not(id: current_user.id)
    return if provisional_accounts.length.zero?
    provisional_kudos = KudoReceipt.where(receiver_id: provisional_accounts)
    provisional_kudos.update_all(receiver_id: current_user.id)
    provisional_accounts.destroy_all
  end
end
