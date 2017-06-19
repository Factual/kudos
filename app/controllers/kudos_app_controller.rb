# frozen_string_literal: true
class KudosAppController < ApplicationController
  def index
    @kudos_app_props = {  id: current_user.id,
                          name: current_user.name,
                          email_notifications: current_user.email_notifications }
  end
end
