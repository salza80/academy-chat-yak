Yak.Components.MessageBox = React.createClass({
  getInitialState: function() {
    return {data: {messages: []}, all_messages_loaded: true};
  },
  handleMessageSubmit: function(message) {
    this.backend.postJSON('chat_rooms/' + this.state.chat_room_id + '/messages.json', message)
  },
  handleRoomClick: function(message, room) {
    this.setState({chat_room_id: room.id});
    this.fetchMessagesFromServer()
    this.pusher.subscribe(room.channel, this.handleNewPusherMessage)
  },
  handleNewPusherMessage: function(message) {
    var messages = this.state.data.messages;
    var newMessages = { messages : messages.concat(message) };
    this.setState({data: newMessages});
  },
  fetchMessagesFromServer: function() {
    this.backend.fetch('chat_rooms/' + this.state.chat_room_id + '/messages.json').then(function (data) {
      this.setState({data: data});
      this.setState({all_messages_loaded: data.all_messages});
    }.bind(this)) 
  },
  fetchPartFromServer: function() {
    var size = this.state.data.messages.length;
    var last_id = size > 0 ? this.state.data.messages[0].id : -1;
    this.backend.fetch('chat_rooms/' + this.state.chat_room_id + '/messages.json?last_id=' + last_id).then(function (data) {
      this.setState({data: {messages: data.messages.concat(this.state.data.messages) }});
      this.setState({all_messages_loaded: data.all_messages})
    }.bind(this))
  },
  componentDidUpdate: function() {
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  componentDidMount: function() {
    this.backend = new Yak.Backend();
    this.pusher =  new Yak.pusherInit();
    PubSub.subscribe('room_click', this.handleRoomClick)
  },
  componentWillUnmount: function() {
    PubSub.unsubscribe(this.handleRoomClick);
  },
  render: function() {
    var messageForm, olderMessagesLink;
    if (this.state['chat_room_id'] !== undefined) {
      messageForm =  <Yak.Components.MessageForm onMessageSubmit={this.handleMessageSubmit} />
      if (!this.state.all_messages_loaded) {
        debugger;
        olderMessagesLink = <a onClick={this.fetchPartFromServer}>Get older messages</a>
     }
    }
    return (
      <div className="message-box">
        <h1 id="the-title">Messages</h1>
        {olderMessagesLink}
        <Yak.Components.MessageList data={this.state.data} />
        {messageForm}
      </div>
    );
  }
});
