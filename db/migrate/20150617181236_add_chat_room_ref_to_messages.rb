class AddChatRoomRefToMessages < ActiveRecord::Migration
  def change
    add_reference :messages, :chat_room, index: true
    add_foreign_key :messages, :chat_rooms
  end
end
