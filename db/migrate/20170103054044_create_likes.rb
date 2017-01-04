class CreateLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :likes do |t|
      t.timestamp
      t.uuid :giver_id, null: false
      t.uuid :kudo_id, null: false
    end
    add_foreign_key :likes, :users, column: 'giver_id'
    add_foreign_key :likes, :kudos, column: 'kudo_id'
  end
end
