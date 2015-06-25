Yak.Components.MessageBox = React.createClass({
  getInitialState: function() {
    return {messages: [], selected_room: {"id": 0, "name": "", "channel":""}, all_messages_loaded: true};
    
  },
  componentDidMount: function() {
    this.backend = new Yak.Backend();
    var pusher = new Yak.PusherManager();
    pusher.addChannelGroup('Messages',[{eventName: "new_message", callback:  this.handleNewPusherMessage }] )
    this.MessagesPusher = pusher.channelGroup["Messages"]
    this.fetchMessagesFromServer(this.props.params.room_id);
  },
  componentWillUnmount: function() {
    this.MessagesPusher.unsubscribe();
  },
  componentDidUpdate: function() {
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  componentWillReceiveProps: function(props) {
    this.fetchMessagesFromServer(props.params.room_id)

  },
  fetchMessagesFromServer: function(room_id) {
    this.backend.fetch('chat_rooms/' + room_id  + '/messages.json').then(function(data){
    this.MessagesPusher.subscribe('room_' + room_id);
    this.setState({messages: data.messages, all_messages_loaded: data.all_messages}); 
    }.bind(this))
  },
  fetchPartFromServer: function() {
    var size = this.state.messages.length;
    var last_id = size > 0 ? this.state.messages[0].id : -1;
    this.backend.fetch('chat_rooms/' + this.props.params.room_id + '/messages.json?last_id=' + last_id).then(function (data) {
      this.setState({messages: data.messages.concat(this.state.messages), all_messages_loaded: data.all_messages});
    }.bind(this))
  },
  handleMessageSubmit: function(message) {
    this.backend.postJSON('chat_rooms/' + this.props.params.room_id + '/messages.json', message)
  },
  handleNewPusherMessage: function(message) {
    var messages = this.state.messages;
    var newMessages = messages.concat(message)
    this.setState({messages: newMessages});
  },

  render: function() {
    var messageForm, olderMessagesLink;
    if (this.props.params.room_id !== undefined) {
      messageForm =  <Yak.Components.MessageForm onMessageSubmit={this.handleMessageSubmit} />
      if (!this.state.all_messages_loaded) {
        olderMessagesLink = <a onClick={this.fetchPartFromServer}>Get older messages</a>
      }
    }
    return (
      <div className="message-box">
        <h1>Messages</h1>
         {olderMessagesLink}
        <Yak.Components.MessageList messages={this.state.messages} />
        {messageForm}
      </div>
    );
  }
});
