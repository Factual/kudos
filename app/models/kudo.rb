# frozen_string_literal: true
class Kudo < ApplicationRecord
  include Filterable
  belongs_to :giver, class_name: "User"
  belongs_to :receiver, class_name: "User"
  has_many :likes, class_name: "Like"
  scope :giver_id, -> (giver_id) { where giver_id: giver_id.to_i }
  scope :receiver_id, -> (receiver_id) { where receiver_id: receiver_id.to_i }

  def as_json(*args)
    {
      id: id,
      body: body,
      giver: giver.name,
      giver_id: giver.id,
      receiver: receiver.name,
      receiver_id: receiver.id,
      given_at: created_at,
      receiver_avatar: receiver.avatar,
      likes: likes
    }
  end
end
