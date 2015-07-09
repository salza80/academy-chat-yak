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
    this.fetchMessagesFromServer(this.props.params.room_id).then(function(data){
      this.scrollMessagesDown();
    }.bind(this))
  },
  componentWillUnmount: function() {
    this.MessagesPusher.unsubscribe();
  },
  componentWillUpdate: function() {
    var node = React.findDOMNode(this.refs.messageListCol);
    this.wasAtBottomMessageList =  node.scrollTop + node.offsetHeight === node.scrollHeight
  },
  componentWillReceiveProps: function(props) {
    this.fetchMessagesFromServer(props.params.room_id).then(function(data){
      this.scrollMessagesDown();
    }.bind(this))
  },
  fetchMessagesFromServer: function(room_id) {
    return Yak.backend.fetch('chat_rooms/' + room_id  + '/messages.json').then(function(data){
      this.setState({
        selected_room: data.selected_room,
        messages: data.messages,
        all_messages_loaded: data.all_messages,
        users: []
      }); 
      this.MessagesPusher.subscribe(data.selected_room.channel);
      return Promise.resolve(data);
    }.bind(this))
  },
  fetchPartFromServer: function() {
    var size = this.state.messages.length;
    var last_id = size > 0 ? this.state.messages[0].id : -1;
    Yak.backend.fetch('chat_rooms/' + this.state.selected_room.id + '/messages.json?last_id=' + last_id).then(function (data) {
      this.setState({messages: data.messages.concat(this.state.messages), all_messages_loaded: data.all_messages});
      this.scrollMessagesUp;
    }.bind(this))
  },
  addUsers: function(users){
    this.setState({users: this.state.users.concat(users)});
  },
  scrollMessagesDown: function(onlyWhenAtBottom){
    var shouldScrollDown = true
    var node = React.findDOMNode(this.refs.messageListCol);
    if (onlyWhenAtBottom){ shouldScrollDown = this.wasAtBottomMessageList; }
    if (shouldScrollDown){ node.scrollTop = node.scrollHeight; }
  },
  scrollMessagesUp: function(){
    var node = React.findDOMNode(this.refs.messageListCol);
    node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
  },
  getUserOnlineDesc: function(){
    user_desc = this.state.users.length > 1 ? " users online" : " user online";
    return this.state.users.length.toString()  +  user_desc
  },
  handleMessageSubmit: function(message) {
    Yak.backend.postJSON('chat_rooms/' + this.state.selected_room.id + '/messages.json', message)
  },
  handleNewPusherMessage: function(message) {
    this.setState({messages: this.state.messages.concat(message)});
    this.scrollMessagesDown(true);
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
    return (
      <div className="container-fluid container message-box">
        <div className ='row'>
          <div className='col-sm-10 message-list-col' ref="messageListCol">
           <h3>{this.state.selected_room.name} - {this.getUserOnlineDesc()}</h3>
           {olderMessagesLink}
          <Yak.Components.MessageList messages={this.state.messages} />
          {messageForm}            
          </div>
          <div className='col-sm-2 user-list-col'>
            <h3>User List</h3>
            <Yak.Components.UserList users={this.state.users} />
          </div>
        </div>
      </div>
    );
  }
});
