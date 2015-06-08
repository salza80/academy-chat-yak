var MessageBox = React.createClass({
  getInitialState: function() {
    return {data: {messages: []}};
  },
  handleMessageSubmit: function(message) {
    console.log("fetch post")
    fetch('messages.json', {  
      credentials: 'include',
      method: 'post',  
      headers: {  
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify({message})
    })
    .then(json)  
    .then(function (data) {  
      console.log('Request succeeded with JSON response', data);  
    }.bind(this))  
    .catch(function (error) {  
      console.log('Request failed', error);  
    });
  },
  fetchMessagesFromServer: function() {
    console.log("fetch get")
    fetch('messages.json', {credentials: 'include' })  
    .then(status)  
    .then(json)  
    .then(function(data) {  
      this.setState({data: data}); 
    }.bind(this)).catch(function(error) {  
      console.log('Request failed', error);  
    });
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


    // $.ajax({
    //   url: 'messages.json',
    //   dataType: 'json',
    //   type: 'POST',
    //   data: message,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this)
    // });
  // },

