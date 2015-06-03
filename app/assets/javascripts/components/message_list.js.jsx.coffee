@MessageList = React.createClass(render: ->
  messageNodes = @props.data.map((message) ->
    `<Message created_at={message.created_at} body = {message.body}></Message>`
  )
  `<div className="message-list">
    {messageNodes}
  </div>`
)
