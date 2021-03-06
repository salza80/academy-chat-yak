Yak.Components.MessageBox = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      selected_room: {"id": 0, "name": "", "channel":""},
      all_messages_loaded: true,
      users: [],
      scroll: "down"
    };
  },
  onchange: function(data) {
      this.setState({
      messages: data.messages,
      selected_room: data.selected_room,
      all_messages_loaded: data.all_messages_loaded,
      users: data.users,
      scroll: data.scroll
    }, this.onStateUpdated);
  },
  onStateUpdated: function(){
    if (this.MessagesPusher.channelName !== this.state.selected_room.channel){
      this.MessagesPusher.subscribe(this.state.selected_room.channel);
    }
    this.scrollMessages();
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
    this.unsubscribe = Yak.Stores.MessagesStore.listen(this.onchange);
    Yak.Actions.MessageActions.Load(this.props.params.room_id);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
    this.MessagesPusher.unsubscribe();
  },
  componentWillUpdate: function() {
    var node = React.findDOMNode(this.refs.messageListCol);
    var scrollOffset = (node.scrollTop + node.offsetHeight) - node.scrollHeight
    this.wasAtBottomMessageList =  (scrollOffset > -5 && scrollOffset < 5)
  },
  componentWillReceiveProps: function(props) {
    Yak.Actions.MessageActions.Load(props.params.room_id);
  },
  fetchPartFromServer: function() {
    var size = this.state.messages.length;
    var last_id = size > 0 ? this.state.messages[0].id : -1;
    var search = React.findDOMNode(this.refs.search).value.trim();
    Yak.Actions.MessageActions.LoadPart(this.state.selected_room.id, last_id, search)
  },
  filterMessages: function() {
    var search = React.findDOMNode(this.refs.search).value.trim();
    Yak.Actions.MessageActions.LoadFiltered(this.state.selected_room.id, search);
  },
  scrollMessages: function(){
    switch (this.state.scroll)
    {
       case "up":
        this.scrollMessagesUp();
        break;
       case "down":
        this.scrollMessagesDown();
        break;
        case "downWhenAtBottom":
        this.scrollMessagesDown(true);
        break;
       default: 
        this.scrollMessagesDown();
    }
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
  handleNewPusherMessage: function(message) {
    Yak.Actions.MessageActions.PusherNewMessage(message);
  },
  handlePresenceSubscriptionSucceeded: function(members) {
    Yak.Actions.MessageActions.LoadUserList(members);
  },
  handlePresenceMemberAdded:function(member) {
    Yak.Actions.MessageActions.UserJoinsRoom(member)
   },
  handlePresenceMemberRemoved:function(member) {
    Yak.Actions.MessageActions.UserLeavesRoom(member);
  },
  render: function() {
    var messageForm, olderMessagesLink;
    if (this.props.params.room_id !== undefined) {
      messageForm =  <Yak.Components.MessageForm selected_room={this.state.selected_room} />
      if (!this.state.all_messages_loaded) {
        olderMessagesLink = <a onClick={this.fetchPartFromServer}>Get older messages</a>
      }
    }
    return (
      <div className="container-fluid container message-box">
        <div className ='row'>
          <div className='col-sm-10 message-list-col' ref="messageListCol">
           <div className='messages-header'>
              <h3>{this.state.selected_room.name} - {this.getUserOnlineDesc()}</h3>
              <span className="glyphicon glyphicon-search" onClick={this.filterMessages} />
              <input type='text' ref='search' placeholder="Search message" />
            </div>
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
