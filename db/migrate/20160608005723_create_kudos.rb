class CreateKudos < ActiveRecord::Migration[5.0]
  def change
    create_table :kudos do |t|
      t.text :body, null: false
      t.integer :giver_id, null: false
      t.integer :receiver_id, null: false
      t.timestamps
    end
    add_foreign_key :kudos, :users, column: 'giver_id'
    add_foreign_key :kudos, :users, column: 'receiver_id'
  end
end
