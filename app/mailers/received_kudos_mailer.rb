class ReceivedKudosMailer < ApplicationMailer

  def received_kudos_notification(kudo)
    @kudo = kudo
    @giver = User.find_by(id: @kudo.giver_id)
    @receiver = User.find_by(id: @kudo.receiver_id)
    @url = ENV["SITE_BASE_URL"]
    mail(to: @receiver.email, subject: "You just received Kudos from #{@giver.name}!")
  end

end
