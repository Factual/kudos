# frozen_string_literal: true
class KudosController < ApplicationController
  ORDER_OPTIONS = {
    'newest': 'created_at DESC',
    'oldest': 'created_at ASC'
  }.freeze

  def index
    unless params[:limit].to_i >= 0 && params[:limit].to_i <= 100
      return render_client_error 'limit is invalid'
    end
    if params[:order] && !(ORDER_OPTIONS.key? params[:order].to_sym)
      return render_client_error 'invalid sort order'
    end

    offset = params[:offset] || 0
    limit = params[:limit] || 10
    order = if params[:order]
              ORDER_OPTIONS[params[:order].to_sym]
            else
              ORDER_OPTIONS['newest']
            end

    filtered = Kudo.all.filter(params.slice(:giver_id, :receiver_id))
    render json: {
      total: filtered.count,
      data: expand_user_info(
        filtered
          .limit(limit)
          .offset(offset)
          .order(order)
      )
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
      return render json: { errors: "recipient with email #{receiver_email.inspect} could not be found" }, status: :not_found
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
      avatar: user.avatar
    }
  end

  def kudo_params
    params.require(:kudo).permit(:body, :receiver_email)
  end
end
