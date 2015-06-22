Yak.Components.MessageBox = React.createClass({
  componentDidUpdate: function() {
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  render: function() {
    var messageForm, olderMessagesLink;
    if (this.props.selected_room.id !== 0) {
      messageForm =  <Yak.Components.MessageForm onMessageSubmit={this.props.onMessageSubmit} />
      if (!this.props.all_messages_loaded) {
        olderMessagesLink = <a onClick={this.props.fetchPartFromServer}>Get older messages</a>
      }
    }
    return (
      <div className="message-box">
        <h1>Messages</h1>
         {olderMessagesLink}
        <Yak.Components.MessageList messages={this.props.messages} />
        {messageForm}
      </div>
    );
  }
});
