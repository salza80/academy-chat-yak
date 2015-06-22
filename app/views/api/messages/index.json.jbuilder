json.messages @messages do |message|
  json.partial! 'api/messages/message', message: message
end
json.all_messages @all_messages
