json.chat_rooms @chat_rooms do |chat_room|
  json.id chat_room.id
  json.name chat_room.name
  json.channel chat_room.channel
end
