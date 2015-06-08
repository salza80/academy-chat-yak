var MessageBox = React.createClass({
  getInitialState: function() {
    return {data: {messages: []}};
  },
  handleMessageSubmit: function(message) {
    // console.log(message)
    // console.log(JSON.stringify({message}))
    if(self.fetch) {
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
        // this.setState({data: data}); 
        console.log('Request succeeded with JSON response', data);  
      }.bind(this))  
      .catch(function (error) {  
        console.log('Request failed', error);  
      });
    } else {
       console.log("jquery post")
      $.ajax({
        url: 'messages.json',
        dataType: 'json',
        type: 'POST',
        data: {message: message},
        success: function(data) {
          console.log('Request succeeded with JSON response', data); 
        }.bind(this)
      });
    }
  },
  fetchMessagesFromServer: function() {
    if(self.fetch) {
      console.log("fetch get")
      fetch('messages.json', {credentials: 'include' })  
      .then(status)  
      .then(json)  
      .then(function(data) {  
        this.setState({data: data}); 
      }.bind(this)).catch(function(error) {  
        console.log('Request failed', error);  
      });
    } else {
      console.log("jquery get")
      $.get("messages.json", function(result) {
        this.setState({data: result}) 
      }.bind(this));
    }
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
