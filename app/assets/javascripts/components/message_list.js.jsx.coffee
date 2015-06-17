Yak.Components.MessageList = React.createClass(
  componentDidMount: ->
    setInterval (->
      this.forceUpdate()
    ).bind(this), 10000
  render: ->
    messageNodes = @props.data.messages.map((message) ->
      `<Yak.Components.Message user={message.user} created_at={message.created_at} body={message.body} key={message.id} />`
    )
    `<div className="message-list">
      {messageNodes}
    </div>`
)
