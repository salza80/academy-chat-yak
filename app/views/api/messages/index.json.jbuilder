json.selected_room do
  json.partial! 'api/chat_rooms/chat_room', chat_room: @chat_room
end
json.messages @messages do |message|
  json.partial! 'api/messages/message', message: message
end
json.all_messages @all_messages
