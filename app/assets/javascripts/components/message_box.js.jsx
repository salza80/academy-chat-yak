Yak.Components.MessageBox = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      selected_room: {"id": 0, "name": "", "channel":""},
      all_messages_loaded: true,
      user_count: undefined
    };
  },
  componentDidMount: function() {
    Yak.PusherManager.addChannelGroup('Messages',[{eventName: "new_message", callback:  this.handleNewPusherMessage }] )
    this.MessagesPusher = Yak.PusherManager.channelGroup["Messages"]
    Yak.PusherManager.addChannelGroup('RoomPresence',
      [
        {eventName: "pusher:subscription_succeeded", callback:  this.handlePresenceSubscriptionSucceeded },
        {eventName: "pusher:member_added", callback:  this.handlePresenceMemberAdded },
        {eventName: "pusher:member_removed", callback:  this.handlePresenceMemberRemoved }
      ] 
    )
    this.PresencePusher = Yak.PusherManager.channelGroup["RoomPresence"]
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
    Yak.backend.fetch('chat_rooms/' + room_id  + '/messages.json').then(function(data){
    this.MessagesPusher.subscribe(data.selected_room.channel);
    this.PresencePusher.subscribe("presence-" + room_id);
    this.setState({
      selected_room: data.selected_room,
      messages: data.messages,
      all_messages_loaded: data.all_messages,
      user_count: undefined
    }); 
    }.bind(this))
  },
  fetchPartFromServer: function() {
    var size = this.state.messages.length;
    var last_id = size > 0 ? this.state.messages[0].id : -1;
    Yak.backend.fetch('chat_rooms/' + this.state.selected_room.id + '/messages.json?last_id=' + last_id).then(function (data) {
      this.setState({messages: data.messages.concat(this.state.messages), all_messages_loaded: data.all_messages});
    }.bind(this))
  },
  handleMessageSubmit: function(message) {
    Yak.backend.postJSON('chat_rooms/' + this.state.selected_room.id + '/messages.json', message)
  },
  handleNewPusherMessage: function(message) {
    var messages = this.state.messages;
    var newMessages = messages.concat(message)
    this.setState({messages: newMessages});
  },
  handlePresenceSubscriptionSucceeded: function(members) {
    this.setState({user_count: members.count})
  },
  handlePresenceMemberAdded:function(members) {
    this.setState({user_count: this.state.user_count + 1 })
  },
  handlePresenceMemberRemoved:function(members) {
    this.setState({user_count: this.state.user_count - 1 })
  },
  render: function() {
    var messageForm, olderMessagesLink;
    if (this.props.params.room_id !== undefined) {
      messageForm =  <Yak.Components.MessageForm onMessageSubmit={this.handleMessageSubmit} />
      if (!this.state.all_messages_loaded) {
        olderMessagesLink = <a onClick={this.fetchPartFromServer}>Get older messages</a>
      }
    }
    user_desc = " user online"
    if (this.state.user_count > 1){
      user_desc = " users are online"
    }
    return (
      <div className="message-box">
        <h1>{this.state.selected_room.name} - {this.state.user_count} {user_desc}</h1>
         {olderMessagesLink}
        <Yak.Components.MessageList messages={this.state.messages} />
        {messageForm}
      </div>
    );
  }
});
