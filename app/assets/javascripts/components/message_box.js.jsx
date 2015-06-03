var MessageBox = React.createClass({
  getInitialState: function() {
    return {data: [
      {"body":"you don't have any messages yet!", "created_at":""}
    ]};
  },
   componentDidMount: function() {
    fetch('messages.json', {credentials: 'include' })  
    .then(status)  
    .then(json)  
    .then(function(data) {  
      this.setState({data: data}); 
    }.bind(this)).catch(function(error) {  
      console.log('Request failed', error);  
    });
  },
  render: function() {
     console.log('Request succeeded with JSON response', this.state.data); 
    return (
      <div className="message-box">
        <h1>Messages</h1>
       <MessageList data={this.state.data} />
      </div>
    );
  }
});
