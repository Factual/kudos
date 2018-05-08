# frozen_string_literal: true
class Kudo < ApplicationRecord
  include Filterable

  belongs_to :giver, class_name: "User"
  has_many :receipts, class_name: "KudoReceipt"
  has_many :receivers, through: :receipts, class_name: "User"
  has_many :likes, class_name: "Like"

  def as_json(*args)
    {
      id: id,
      body: body,
      giver: giver.name,
      giver_id: giver.id,
      receivers: receivers.map { |r| r.slice(:id, :name, :avatar) },
      given_at: created_at,
      likes: likes
    }
  end
end
