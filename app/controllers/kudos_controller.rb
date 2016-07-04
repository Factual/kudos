class KudosController < ApplicationController
  def index
    render json: Kudo.all
  end

  # Creates a new Kudo based on current user and specified receiver & body
  #
  # Required params:
  #   :receiver_email [email of receiver]
  #   :body           [body of kudo]
  def create
    giver_id = current_user.id
    receiver_email = kudo_params[:receiver_email]
    receiver = User.find_by!(email: receiver_email)

    kudo = Kudo.new(
      giver_id: giver_id,
      receiver_id: receiver.id,
      body: kudo_params[:body]
    )

    if kudo.save
      render json: { kudo: kudo }
    else
      render json: { errors: kudo.errors }
    end
  end

  private

  def kudo_params
    params.require(:kudo).permit(:body, :receiver_email)
  end
end
