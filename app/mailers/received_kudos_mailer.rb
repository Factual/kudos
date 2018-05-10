class ReceivedKudosMailer < ApplicationMailer

  def received_kudos_notification(receiver)
    @receiver = receiver
    @url = ENV["SITE_BASE_URL"]
    mail(to: @receiver.email, subject: "You just received some Kudos!")
  end

end
