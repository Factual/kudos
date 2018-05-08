# frozen_string_literal: true
class KudosController < ApplicationController
  ORDER_OPTIONS = {
    'newest' => { created_at: :desc },
    'oldest' => { created_at: :asc }
  }.freeze

  def index
    unless (0..100).cover?(params[:limit].to_i)
      return render_client_error 'limit is invalid'
    end
    if params[:order] && !(ORDER_OPTIONS.key? params[:order].to_sym)
      return render_client_error 'invalid sort order'
    end
    if params[:tab]
    end

    offset = params[:offset] || 0
    limit = params[:limit] || 10
    order = if params[:order]
              ORDER_OPTIONS[params[:order].to_sym]
            else
              ORDER_OPTIONS['newest']
            end

            sleep 1 # demo infinite scroll
    kudos = Kudo.includes(:receivers, :giver).order(order)
    kudos =
      case params[:tab]
      when 'My Kudos'
        kudos.joins(:receipts).merge(KudoReceipt.where(receiver_id: current_user.id))
      when 'Awarded Kudos'
        kudos.where(giver_id: current_user.id)
      else
        kudos
      end

    paginated_kudos = kudos.offset(offset).limit(limit)

    render json: { kudos: paginated_kudos, total: kudos.count }
  end

  # Creates a new Kudo based on current user and specified receiver & body
  #
  # Required params:
  #   :receiver_email [email of receiver]
  #   :body           [body of kudo]
  def create
    giver_id = current_user.id
    receiver_email = params[:kudo][:receiver_email]

    unless (receiver = User.find_by(email: receiver_email))
      if !(/@factual.com$/ =~ receiver_email)
        return render(json: { errors: "recipient with email #{receiver_email.inspect} is not part of this organization"}, status: :not_found)
      end
      #return render json: { errors: "recipient with email #{receiver_email.inspect} could not be found" }, status: :not_found
      receiver = User.new(name: receiver_email, email: receiver_email)
      receiver.save
    end

    kudo = Kudo.new(
      giver_id: giver_id,
      receiver_ids: [receiver.id],
      body: kudo_params[:body]
    )

    if kudo.save
      render json: { kudo: kudo }, status: :created
    else
      render json: { error: kudo.errors.messages.values.flatten.to_sentence }, status: :unprocessable_entity
    end
  end

  def update
    kudo = Kudo.find_by!(id: params[:kudo][:id], giver_id: current_user.id)

    if kudo.update!(body: kudo_params[:body])
      render json: { kudo: kudo }, status: :created
    else
      render json: { error: kudo.errors.messages.values.flatten.to_sentence }, status: :unprocessable_entity
    end
  end

  private

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
    params.require(:kudo).permit(:body)
  end
end
