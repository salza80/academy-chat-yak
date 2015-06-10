var MessageBox = React.createClass({
  getInitialState: function() {
    return {data: {messages: []}};
  },
  handleMessageSubmit: function(message) {
    this.backend.postJSON('messages.json', message)
  },
  fetchMessagesFromServer: function() {
    this.backend.fetch('messages.json').then(function(data){
      this.setState({data: data}); 
    }.bind(this))    
  },   
  componentDidMount: function() {
    var that = this
    this.backend = new Yak.Backend();
    this.fetchMessagesFromServer();
    var push =  new Yak.pusherInit();
    push.channel.bind('my_event', function(message) {
      var messages = this.state.data.messages;
      var newMessages = { messages : messages.concat(message) };
      this.setState({data: newMessages});
    }.bind(this));
  },
  render: function() {
    return (
      <div className="message-box">
        <h1>Messages</h1>
        <MessageList data={this.state.data} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});
