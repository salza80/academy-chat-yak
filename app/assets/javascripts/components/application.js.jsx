Yak.Components.Application = React.createClass({
  getInitialState: function() {
    return {messages: [], chat_rooms: [], selected_room: {"id": 0, "name": "", "channel":""}, all_messages_loaded: true};
    
  },
  fetchRoomsFromServer: function() {
    this.backend.fetch('chat_rooms.json').then(function(data) {
        this.setState({chat_rooms: data.chat_rooms});
        if(data.chat_rooms.length > 0){
          this.fetchMessagesFromServer(data.chat_rooms[0]);
        }
      }.bind(this))
  },
  handleAddRoom: function(chat_room) {
    this.backend.postJSON('chat_rooms.json', chat_room).then(function(new_chat_room) {
      var chat_rooms = this.state.chat_rooms;
      var newrooms = chat_rooms.concat(new_chat_room)
      this.setState({chat_rooms: newrooms});
      this.fetchMessagesFromServer(new_chat_room);
    }.bind(this))
  },
  handleRoomClick: function(room) {
    this.fetchMessagesFromServer(room)
  },
  fetchMessagesFromServer: function(room) {
    this.backend.fetch('chat_rooms/' + room.id  + '/messages.json').then(function(data){
      if(this.state.selected_room.id !== room.id){
        this.pusher.subscribe(room.channel, this.handleNewPusherMessage);
      }
      this.setState({messages: data.messages, selected_room: room}); 
      this.setState({all_messages_loaded: data.all_messages});
    }.bind(this))
  },
  fetchPartFromServer: function() {
    var size = this.state.messages.length;
    var last_id = size > 0 ? this.state.messages[0].id : -1;
    this.backend.fetch('chat_rooms/' + this.state.selected_room.id + '/messages.json?last_id=' + last_id).then(function (data) {
      this.setState({messages: data.messages.concat(this.state.messages)});
      this.setState({all_messages_loaded: data.all_messages});
    }.bind(this))
  },
  handleMessageSubmit: function(message) {
    this.backend.postJSON('chat_rooms/' + this.state.selected_room.id + '/messages.json', message)
  },
  componentDidMount: function() {
    this.backend = new Yak.Backend();
    this.pusher =  new Yak.pusherInit();  
    this.fetchRoomsFromServer();
  },  
  componentWillUnmount: function() {
    this.pusher.unsubscribe();
  },
  handleNewPusherMessage: function(message) {
    var messages = this.state.messages;
    var newMessages = messages.concat(message)
    this.setState({messages: newMessages});
  },
  render: function() {
    return (
      <div className = 'container-fluid container'>
        <div className ='row'>
          <div className='col-sm-2 rooms-col'>
            <Yak.Components.RoomBox selected_room_id={this.state.selected_room.id} chat_rooms={this.state.chat_rooms} onRoomClick = {this.handleRoomClick} onAddRoomClick = {this.handleAddRoom} />
          </div>
          <div className='col-sm-10 messages-col'>
             <Yak.Components.MessageBox selected_room = {this.state.selected_room}
              messages= {this.state.messages} 
              onMessageSubmit= {this.handleMessageSubmit} 
              fetchPartFromServer={this.fetchPartFromServer} 
              all_messages_loaded = {this.state.all_messages_loaded} />
          </div>
        </div>
      </div>
    );
  }
});
