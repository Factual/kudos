class AddCursorIndexes < ActiveRecord::Migration[5.0]
  def change
    add_index :kudos, [:created_at, :id]
  end
end
