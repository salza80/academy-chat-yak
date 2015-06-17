Yak.Components.MessageBox = React.createClass({
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
  componentDidUpdate: function() {
  var node = this.getDOMNode();
  node.scrollTop = node.scrollHeight;
  },  
  componentDidMount: function() {
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
        <Yak.Components.MessageList data={this.state.data} />
        <Yak.Components.MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});
