class KudosAppController < ApplicationController
  def index
    @kudos_app_props = { name: "Stranger" }
  end
end
