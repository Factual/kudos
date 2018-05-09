class AddMiscIndexes < ActiveRecord::Migration[5.0]
  def change
    add_index :kudos, :giver_id
    add_index :kudos, :created_at
  end
end
