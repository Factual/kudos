class Kudo < ApplicationRecord
  include Filterable
  scope :giver_id, -> (giver_id) { where giver_id: giver_id.to_i }
  scope :receiver_id, -> (receiver_id) { where receiver_id: receiver_id.to_i }
end
