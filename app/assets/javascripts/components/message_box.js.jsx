var MessageBox = React.createClass({
  getBackend: function(){
    return new Backend();
  },
  getInitialState: function() {
    return {data: {messages: []}};
  },
  handleMessageSubmit: function(message) {
    backend = this.getBackend();
    backend.postJSON('messages.json', message)
  },
  fetchMessagesFromServer: function() {
    backend = this.getBackend();
    backend.fetch('messages.json').then(function(data){
      this.setState({data: data}); 
    }.bind(this))    
  },   
  componentDidMount: function() {
    var that = this
    this.fetchMessagesFromServer();
    var push =  new pusherInit();
    push.channel.bind('my_event', function() {
      this.fetchMessagesFromServer();
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
