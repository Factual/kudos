# frozen_string_literal: true
class KudosAppController < ApplicationController
  def index
    @kudos_app_props = { kudos: Kudo.order(created_at: :desc) }
  end
end
