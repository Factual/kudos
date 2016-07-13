class UsersController < ApplicationController
  def search
    results = User.fuzzy_search(params[:q])
      .as_json(only: [:id, :name, :email, :avatar])
    render json: results
  end
end
