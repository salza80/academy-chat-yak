class CreateChatRooms < ActiveRecord::Migration
  def change
    create_table :chat_rooms do |t|
      t.integer :channel_id
      t.string :name
    end
  end
end
