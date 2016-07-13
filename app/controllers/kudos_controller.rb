class KudosController < ApplicationController
  def index
    unless params[:limit].to_i >= 0 && params[:limit].to_i <= 100
      return render_client_error 'limit is invalid'
    end
    offset = params[:offset] || 0
    limit = params[:limit] || 10
    render json: {
      total: Kudo.all.count,
      data: expand_user_info(Kudo.all.limit(limit).offset(offset))
    }
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

  def expand_user_info(kudos)
    kudos_array = []
    kudos.each do |kudo|
      kudo_hash = kudo.attributes
      kudo_hash['giver'] = basic_user_info_by_id kudo.giver_id
      kudo_hash.delete 'giver_id'
      kudo_hash['receiver'] = basic_user_info_by_id kudo.receiver_id
      kudo_hash.delete 'receiver_id'
      kudos_array.push kudo_hash
    end
    kudos_array
  end

  def basic_user_info_by_id(id)
    user = User.find(id)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
  end

  def kudo_params
    params.require(:kudo).permit(:body, :receiver_email)
  end
end
