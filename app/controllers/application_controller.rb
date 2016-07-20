# frozen_string_literal: true
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  helper_method :current_user
  before_action :require_logged_in_user

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_logged_in_user
    return if current_user

    respond_to do |format|
      format.html do
        redirect_to new_session_path unless current_user
      end
      format.json do
        head :unauthorized
      end
    end
  end

  def render_client_error(message)
    if message
      resp = { error: message }
      render json: resp, status: 400
    else
      render nothing: true, status: 400
    end
  end
end
