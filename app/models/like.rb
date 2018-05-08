# frozen_string_literal: true
class Like < ApplicationRecord
  include Filterable
  belongs_to :giver, class_name: "User"
  belongs_to :kudo, class_name: "Kudo"

  def as_json(*args)
    {
      id: id,
      giver: giver.name,
      giver_id: giver.id,
    }
  end
end
