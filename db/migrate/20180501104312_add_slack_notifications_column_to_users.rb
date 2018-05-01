class AddSlackNotificationsColumnToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :slack_notifications, :boolean, :default => true, :null => false
  end
end
