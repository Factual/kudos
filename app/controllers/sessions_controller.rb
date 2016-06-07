class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    if user
      session[:user_id] = user.id
    else
      flash[:error] = "Doesn't look like you're an internal user. Try logging in with another account."
    end
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
