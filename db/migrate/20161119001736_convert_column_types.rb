class ConvertColumnTypes < ActiveRecord::Migration[5.0]
  def change
    # Use the uuid-ossp contrib module
    execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    # Drop foreign keys
    remove_foreign_key :kudos, column: :giver_id
    remove_foreign_key :kudos, column: :receiver_id

    # Change column types at will!

    # Add old_id column, copy over ids
    add_column :users, :old_id, :integer
    execute("UPDATE users SET old_id = id")

    # Drop id defaults, change id cols to uuid with using, change default
    execute("ALTER TABLE kudos ALTER COLUMN id DROP DEFAULT")
    execute("ALTER TABLE users ALTER COLUMN id DROP DEFAULT")

    execute("ALTER TABLE kudos ALTER COLUMN id TYPE uuid USING uuid_generate_v4()")
    execute("ALTER TABLE users ALTER COLUMN id TYPE uuid USING uuid_generate_v4()")

    execute("ALTER TABLE kudos ALTER COLUMN id SET DEFAULT uuid_generate_v4()")
    execute("ALTER TABLE users ALTER COLUMN id SET DEFAULT uuid_generate_v4()")

    # Change vals in kudos table referencing user id
    rename_column :kudos, :giver_id, :old_giver_id
    rename_column :kudos, :receiver_id, :old_receiver_id

    add_column :kudos, :giver_id, :uuid
    add_column :kudos, :receiver_id, :uuid

    giver_sql = "
      UPDATE kudos
      SET giver_id = users.id
      FROM users
      WHERE users.old_id = kudos.old_giver_id
    "

    receiver_sql = "
      UPDATE kudos
      SET receiver_id = users.id
      FROM users
      WHERE users.old_id = kudos.old_receiver_id
    "
    execute(giver_sql)
    execute(receiver_sql)

    # Remove old cols
    remove_column :kudos, :old_giver_id
    remove_column :kudos, :old_receiver_id

    # Make refs not null
    change_column_null :kudos, :giver_id, false
    change_column_null :kudos, :receiver_id, false

    # Add back foreign keys
    add_foreign_key :kudos, :users, column: :giver_id
    add_foreign_key :kudos, :users, column: :receiver_id
  end
end
