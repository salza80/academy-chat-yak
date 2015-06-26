class AddRemovedToChatRoom < ActiveRecord::Migration
  def change
    add_column :chat_rooms, :removed, :boolean, default: false
  end
end
