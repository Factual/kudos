# frozen_string_literal: true
class KudosController < ApplicationController

  SORTING = {
    created_at: :desc
  }.freeze

  def index
    unless (0..100).cover?(params[:limit].to_i)
      return render_client_error 'limit is invalid'
    end

    limit = params[:limit] || 10
    cursor_time = params[:cursor_time]

    kudos = Kudo.includes(:receivers, :giver).order(SORTING)
    kudos =
      case params[:tab]
      when 'My Kudos'
        kudos.joins(:receipts).merge(KudoReceipt.where(receiver_id: current_user.id))
      when 'Awarded Kudos'
        kudos.where(giver_id: current_user.id)
      else
        kudos
      end

    kudos_count = kudos.count

    # offset using cursor and paginate
    kudos = kudos.where("created_at < ?", cursor_time) if cursor_time.present?
    kudos = kudos.limit(limit)

    render json: { kudos: kudos, total: kudos_count }
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
      receivers.each(&:notify)
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
