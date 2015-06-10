Yak.Components.MessageList = React.createClass(render: ->
  messageNodes = @props.data.messages.map((message) ->
    `<Yak.Components.Message user={message.user} created_at={message.created_at} body = {message.body} key={message.id} />`
  )
  `<div className="message-list">
    {messageNodes}
  </div>`
)
