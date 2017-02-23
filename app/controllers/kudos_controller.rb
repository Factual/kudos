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
    kudos = Kudo.includes(:receiver, :giver).order(order)
    kudos =
      case params[:tab]
      when 'My Kudos'
        kudos.where(receiver_id: current_user.id)
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
    receiver_email = kudo_params[:receiver_email]

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
      receiver_id: receiver.id,
      body: kudo_params[:body]
    )

    if kudo.save
      render json: { kudo: kudo }, status: :created

      # Success, send email notification
      ReceivedKudosMailer.received_kudos_notification(kudo).deliver_now


      # Notify user via slack. This is initalized in kudos/environment.rb.
      # Can this be called once initially and then regularly
      # updated via scheduled job?
      slack_users_list = kudosbot.users_list.members
      receiver_slack_name = ""

      # Find slack user name for receiver. Should this be a helper method
      # in ../helpers/application_helper? That method should take an
      # array of IDs and return a hash of emails to slack usernames.
      # i.e. helpers.find_slack_usernames([ID1, ID2]) =>
      #   {ID1: slackname1, ID2, slackname2}

      # Per Byron, we should probably just add slack usernames to
      # the DB for all new users

      slack_users_list.each do |user|
        receiver_slack_name = user['name'] if user.profile["email"] == receiver_email
      end
      fail "No Slack user found with email #{receiver_email}" unless receiver_slack_name

      # Post message to kudos channel in slack.
      kudosbot.chat_postMessage(channel: '#kudos-dev', text: "Hey @#{receiver_slack_name}, you just received a kudos on http://kudos.factual.com!", as_user: true, "link_names": 1)

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
    params.require(:kudo).permit(:body, :receiver_email)
  end
end
