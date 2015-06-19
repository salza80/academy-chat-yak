Yak.Components.MessageBox = React.createClass({
  getInitialState: function() {
    return {data: {messages: []}};
  },
  handleMessageSubmit: function(message) {
    this.backend.postJSON('chat_rooms/' + this.state.chat_room_id + '/messages.json', message)
  },
  handleRoomClick: function(message, chat_room_id) {
    this.setState({chat_room_id: chat_room_id});
    this.fetchMessagesFromServer()
    this.pusher.subscribe('room_' + chat_room_id, this.handleNewPusherMessage)
  },
  handleNewPusherMessage: function(message) {
    var messages = this.state.data.messages;
    var newMessages = { messages : messages.concat(message) };
    this.setState({data: newMessages});
  },
  fetchMessagesFromServer: function() {
    this.backend.fetch('chat_rooms/' + this.state.chat_room_id + '/messages.json').then(function(data){
      this.setState({data: data}); 
    }.bind(this))    
  }, 
  componentDidUpdate: function() {
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  componentDidMount: function() {
    this.backend = new Yak.Backend();
    this.pusher =  new Yak.pusherInit();
    PubSub.subscribe('room_click', this.handleRoomClick)
  },
  componentWillUnmount: function() {
    PubSub.unsubscribe(this.handleRoomClick);
  },
  render: function() {
    var messageForm 
    if (this.state['chat_room_id'] !== undefined) {
      messageForm =  <Yak.Components.MessageForm onMessageSubmit={this.handleMessageSubmit} />
    }
    return (
      <div className="message-box">
        <h1>Messages</h1>
        <Yak.Components.MessageList data={this.state.data} />
        {messageForm}
      </div>
    );
  }
});
