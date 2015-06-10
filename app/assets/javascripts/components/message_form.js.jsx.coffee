Yak.Components.MessageForm = React.createClass
  handleSubmit: (e) ->
    e.preventDefault()
    body = React.findDOMNode(this.refs.body).value.trim()
    this.props.onMessageSubmit({message:{body: body}})
    React.findDOMNode(this.refs.body).value = ''
  render: ->
    `<form className="message-form" onSubmit={this.handleSubmit}>
      <input id="Body" type="text" placeholder="Enter message" ref="body" />
      <input type="submit" value="Send" />
    </form>`
