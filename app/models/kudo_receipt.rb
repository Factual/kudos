class KudoReceipt < ApplicationRecord
  self.table_name = "kudos_to_receivers"

  belongs_to :kudo
  belongs_to :receiver, class_name: "User"
end
