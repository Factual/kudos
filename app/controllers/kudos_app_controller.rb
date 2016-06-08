class KudosAppController < ApplicationController
  def index
    @kudos_app_props = { kudos: Kudo.all }
  end
end
