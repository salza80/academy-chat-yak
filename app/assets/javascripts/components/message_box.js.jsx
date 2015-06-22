Yak.Components.MessageBox = React.createClass({
  componentDidUpdate: function() {
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  render: function() {
    var messageForm 
    if (this.props.selected_room.id !== 0) {
      messageForm =  <Yak.Components.MessageForm onMessageSubmit={this.props.onMessageSubmit} />
    }
    return (
      <div className="message-box">
        <h1>Messages</h1>
        <Yak.Components.MessageList messages={this.props.messages} />
        {messageForm}
      </div>
    );
  }
});
