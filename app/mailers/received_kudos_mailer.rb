class ReceivedKudosMailer < ApplicationMailer

  # Generated using `docker-compose run web rails generate mailer ReceivedKudosMailer`
  # NOTE: associated views need to be created in ../views/received_kudos_mailer/

  def received_kudos_notification(kudo)
    @kudo = kudo
    @giver = User.find_by(id: @kudo.giver_id)
    @receiver = User.find_by(id: @kudo.receiver_id)
    @url = 'http://kudos.factual.com'
    mail(to: @receiver.email, subject: "You just received Kudos from #{@giver.name}!")
  end

end
