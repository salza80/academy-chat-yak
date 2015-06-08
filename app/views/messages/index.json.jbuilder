json.messages @messages do |message|
  json.id message.id
  json.body message.body
  json.created_at message.created_at.strftime("%m/%d/%Y %H:%M:%S")
  json.user message.user ? message.user.name : "Guest"
end
