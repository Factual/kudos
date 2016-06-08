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
    receiver_email = params[:kudo][:receiver_email]
    receiver = User.find_by(email: receiver_email)

   Rails.logger.debug("**** kudo_parms: #{kudo_params}")

    kudo = Kudo.new({giver_id: giver_id,
                     receiver_id: receiver.id,
                     body: params[:kudo][:body]})

    if kudo.save
      Rails.logger.debug("**** SAVED! kudo id = #{kudo.id}  8-]")
    else
      Rails.logger.debug("**** looked up receiver: #{recevier}")
    end

    #TODO: REST/post resp?
    render json: kudo_params.inspect
  end

  private
  def kudo_params
    params.require(:kudo).permit(:body, :receiver_email)
  end


end
