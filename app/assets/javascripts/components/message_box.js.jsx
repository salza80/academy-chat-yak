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
    this.backend = new Backend();
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
