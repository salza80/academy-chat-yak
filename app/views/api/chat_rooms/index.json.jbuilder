json.chat_rooms @chat_rooms do |chat_room|
  json.partial! 'api/chat_rooms/chat_room', chat_room: chat_room
end
