Yak.Components.MessageForm = React.createClass
  handleSubmit: (e) ->
    e.preventDefault()
    body = React.findDOMNode(this.refs.body).value.trim()
    message = {body: body}
    Yak.Actions.MessageActions.AddMessage(this.props.selected_room.id, message);
    React.findDOMNode(this.refs.body).value = ''
  render: ->
    <form className="message-form" onSubmit={this.handleSubmit}>
      <input className="message-body" type="text" placeholder="Enter message" ref="body" />
      <input type="submit" value="Send" />
    </form>
