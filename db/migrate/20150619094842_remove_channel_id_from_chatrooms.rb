class RemoveChannelIdFromChatrooms < ActiveRecord::Migration
  def change
    remove_column :chat_rooms, :channel_id
  end
end
