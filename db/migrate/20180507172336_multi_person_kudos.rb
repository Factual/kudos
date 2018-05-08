class MultiPersonKudos < ActiveRecord::Migration[5.0]
  def change
    create_table :kudos_to_receivers, id: :uuid do |t|
      t.timestamps
      t.uuid :kudo_id, null: false
      t.uuid :receiver_id, null: false
    end

    add_foreign_key :kudos_to_receivers, :kudos, column: 'kudo_id'
    add_foreign_key :kudos_to_receivers, :users, column: 'receiver_id'
    add_index :kudos_to_receivers, [:kudo_id, :receiver_id], unique: true

    reversible do |dir|
      dir.up do
        receipt_rows = Kudo.all.map do |kudo|
          receiver = User.find(kudo.receiver_id)
          emails = receiver.email.split(',').map(&:strip)

          User.where(email: emails).map do |user|
            { kudo_id: kudo.id, receiver_id: user.id }
          end
        end.flatten

        KudoReceipt.create!(receipt_rows)

        remove_column :kudos, :receiver_id
        User.where("email LIKE '%,%'").destroy_all
      end

      dir.down do
        add_column :kudos, :receiver_id, :uuid

        Kudo.reset_column_information
        Kudo.all.each do |kudo|
          kudo.receiver_id = kudo.receivers.first.id
          kudo.save!
        end

        change_column_null :kudos, :receiver_id, false
      end
    end
  end
end
