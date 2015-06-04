@MessageForm = React.createClass
  handleSubmit: (e) ->
    e.preventDefault()
    body = React.findDOMNode(this.refs.body).value.trim()
    this.props.onMessageSubmit({message: {body: body}})
    React.findDOMNode(this.refs.body).value = ''
  render: ->
    `<form className="messageForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Enter message" ref="body" />
      <input type="submit" value="Post" />
    </form>`
