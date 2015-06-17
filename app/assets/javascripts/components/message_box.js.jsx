Yak.Components.MessageBox = React.createClass({
  getInitialState: function() {
    return {data: {messages: []}, chat_room_id: 1};
  },
  handleMessageSubmit: function(message) {
    this.backend.postJSON('chat_rooms/' + this.state.chat_room_id + '/messages.json', message)
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
    this.handle_room_click = PubSub.subscribe('room_click', function(message, chat_room_id) {
      this.setState({chat_room_id: chat_room_id});
      this.fetchMessagesFromServer()
    }.bind(this));
    this.backend = new Yak.Backend();
    var push =  new Yak.pusherInit();
    push.channel.bind('my_event', function(message) {
      var messages = this.state.data.messages;
      var newMessages = { messages : messages.concat(message) };
      this.setState({data: newMessages});
    }.bind(this));
  },
  componentWillUnmount: function() {
    // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
    PubSub.unsubscribe(this.handle_room_click);
  },
  render: function() {
    return (
      <div className="message-box">
        <h1>Messages</h1>
        <Yak.Components.MessageList data={this.state.data} />
        <Yak.Components.MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});
