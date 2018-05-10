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
  #   :receiver_emails [array of emails of receivers]
  #   :body            [body of kudo]
  def create
    emails = params[:kudo][:receiver_emails]
    begin
      receivers = emails.map do |email|
        User.find_or_create_by!(email: email)
      end
    rescue ActiveRecord::RecordInvalid => e
      return render(
        json: { errors: e },
        status: :unprocessable_entity
      )
    end

    kudo = Kudo.new(
      giver: current_user,
      receivers: receivers,
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
