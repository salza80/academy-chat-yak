var MessageBox = React.createClass({
  getInitialState: function() {
    return {data: {messages: []}};
  },
  handleMessageSubmit: function(message) {
    $.ajax({
      url: 'messages.json',
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  },

  fetchMessagesFromServer: function() {
    $.get("messages.json", function(result) {
      this.setState({data: result});
    }.bind(this));
  },

  componentDidMount: function() {
    var that = this
    this.fetchMessagesFromServer();

    var pusher = new Pusher('fdac954e72641ea1c7c7');
    var channel = pusher.subscribe('test_channel');
    channel.bind('my_event', function() {
      this.fetchMessagesFromServer();
    }.bind(this));
  },

  render: function() {
    console.log('Request succeeded with JSON response', this.state.data); 
    return (
      <div className="message-box">
        <h1>Messages</h1>
        <MessageList data={this.state.data} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});


// componentDidMount: function() {
//     fetch('messages.json', {credentials: 'include' })  
//     .then(status)  
//     .then(json)  
//     .then(function(data) {  
//       this.setState({data: data}); 
//     }.bind(this)).catch(function(error) {  
//       console.log('Request failed', error);  
//     });
//   },
