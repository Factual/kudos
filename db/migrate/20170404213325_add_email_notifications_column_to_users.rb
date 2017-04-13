class AddEmailNotificationsColumnToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :email_notifications, :boolean, :default => true, :null => false
  end
end
