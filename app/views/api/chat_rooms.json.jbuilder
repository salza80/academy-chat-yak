json.chat_rooms @chat_rooms do |chat_room|
  json.id chat_room.id
  json.channel_id chat_room.channel_id
  json.name chat_room.name
end
