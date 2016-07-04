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

    unless (receiver = User.find_by(email: receiver_email))
      return render json: { errors: "recipient with email #{receiver_email.inspect} could not be found"}, status: :not_found
    end

    kudo = Kudo.new(
      giver_id: giver_id,
      receiver_id: receiver.id,
      body: kudo_params[:body]
    )

    if kudo.save
      render json: { kudo: kudo }, status: :created
    else
      render json: { errors: kudo.errors }
    end
  end

  private

  def kudo_params
    params.require(:kudo).permit(:body, :receiver_email)
  end
end
