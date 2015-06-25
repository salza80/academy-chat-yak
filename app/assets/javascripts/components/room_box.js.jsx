
Yak.Components.RoomBox = React.createClass({
  getInitialState: function() {
    return {chat_rooms: []};
    
  },
  componentDidMount: function() {
    this.backend = new Yak.Backend();
    var pusher = new Yak.PusherManager();
    pusher.addChannelGroup('Rooms', [{eventName: "new_room", callback:  this.handlePusherNewRoom}])
    this.RoomsPusher = pusher.channelGroup["Rooms"]
    this.RoomsPusher.subscribe('chat_rooms')
    this.fetchRoomsFromServer();
  },  
  componentWillUnmount: function() {
    this.RoomsPusher.unsubscribe();
  },
  fetchRoomsFromServer: function() {
    this.backend.fetch('chat_rooms.json').then(function(data) {
      this.setState({chat_rooms: data.chat_rooms});
    }.bind(this))
  },
  handleAddRoom: function(chat_room) {
    this.addedRoom = chat_room.chat_room.name
    this.backend.postJSON('chat_rooms.json', chat_room)
  },
  handlePusherNewRoom: function(new_chat_room){
    this.setState({chat_rooms: this.state.chat_rooms.concat(new_chat_room)});
    if (this.addedRoom == new_chat_room.name){
      //click link or
      //redirect url?
      this.addedRoom=""
    }
  },
  render: function() {
    return (
    <div className="rooms-box">
      <h3>Rooms</h3>
      <Yak.Components.RoomList chat_rooms={this.state.chat_rooms} />
      <div className="add-room-form">
        <Yak.Components.RoomForm onAddRoomClick={this.handleAddRoom} />
      </div>
    </div>
    );
  }
});
