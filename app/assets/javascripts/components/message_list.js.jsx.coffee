@MessageList = React.createClass(render: ->
  messageNodes = @props.data.messages.map((message) ->
    `<Message user = {message.user} created_at={message.created_at} body = {message.body}></Message>`
  )
  `<div className="message-list">
    {messageNodes}
  </div>`
)
