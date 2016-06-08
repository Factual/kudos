class KudosController < ApplicationController
  def index
    render json: Kudo.all
  end

  def create
    render plain: params[:kudo].inspect
  end
end
