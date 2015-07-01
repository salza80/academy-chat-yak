Yak.Components.MessageBox = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      selected_room: {"id": 0, "name": "", "channel":""},
      all_messages_loaded: true,
      users: []
    };
  },
  componentDidMount: function() {
    Yak.PusherManager.addChannelGroup('Messages',
      [
        {eventName: "new_message", callback:  this.handleNewPusherMessage },
        {eventName: "pusher:subscription_succeeded", callback:  this.handlePresenceSubscriptionSucceeded },
        {eventName: "pusher:member_added", callback:  this.handlePresenceMemberAdded },
        {eventName: "pusher:member_removed", callback:  this.handlePresenceMemberRemoved }
      ] 
    )
    this.MessagesPusher = Yak.PusherManager.channelGroup["Messages"]
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
    this.setState({
      selected_room: data.selected_room,
      messages: data.messages,
      all_messages_loaded: data.all_messages,
      users: []
    }); 
    this.MessagesPusher.subscribe(data.selected_room.channel);
    }.bind(this))
  },
  fetchPartFromServer: function() {
    var size = this.state.messages.length;
    var last_id = size > 0 ? this.state.messages[0].id : -1;
    Yak.backend.fetch('chat_rooms/' + this.state.selected_room.id + '/messages.json?last_id=' + last_id).then(function (data) {
      this.setState({messages: data.messages.concat(this.state.messages), all_messages_loaded: data.all_messages});
    }.bind(this))
  },
  addUsers: function(users){
    this.setState({users: this.state.users.concat(users)});
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
    var users = [];
     members.each(function(member) {
      users.push({id: member.id, name: member.info.name});
    });
    this.addUsers(users);
  },
  handlePresenceMemberAdded:function(member) {
    var users = [];
    users.push({id: member.id, name: member.info.name});
   this.addUsers(users);
  },
  handlePresenceMemberRemoved:function(member) {
   users = this.state.users.filter(function(user){
      return user.id !== member.id
   });
    this.setState({users: users});
  },
  render: function() {
    var messageForm, olderMessagesLink;
    if (this.props.params.room_id !== undefined) {
      messageForm =  <Yak.Components.MessageForm onMessageSubmit={this.handleMessageSubmit} />
      if (!this.state.all_messages_loaded) {
        olderMessagesLink = <a onClick={this.fetchPartFromServer}>Get older messages</a>
      }
    }
    user_desc = undefined
    if (this.state.users.length > 1){
      user_desc = " users online"
    } else { user_desc = " user online"}
    return (
      <div className="message-box">
        <h1>{this.state.selected_room.name} - {this.state.users.length} {user_desc}</h1>
         {olderMessagesLink}
        <Yak.Components.MessageList messages={this.state.messages} />
        {messageForm}
      </div>
    );
  }
});
