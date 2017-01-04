# frozen_string_literal: true
class Like < ApplicationRecord
  include Filterable
  belongs_to :giver, class_name: "User"
  belongs_to :kudo, class_name: "Kudo"
  scope :giver_id, -> (giver_id) { where giver_id: giver_id.to_i }
  scope :receiver_id, -> (receiver_id) { where receiver_id: receiver_id.to_i }

  def as_json(*args)
    {
      id: id,
      giver: giver.name,
      giver_id: giver.id,
    }
  end
end
