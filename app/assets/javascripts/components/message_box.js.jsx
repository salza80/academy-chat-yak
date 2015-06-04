var MessageBox = React.createClass({
  getInitialState: function() {
    return {data: [
      {"body":"you don't have any messages yet!", "created_at":""}
    ]};
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
  componentDidMount: function() {
    $.get("messages.json", function(result) {
      this.setState({data: result})
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