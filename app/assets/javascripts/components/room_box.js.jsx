var Navigation = ReactRouter.Navigation;
var State = ReactRouter.State;

Yak.Components.RoomBox = React.createClass({
  mixins: [Navigation, State ],
  getInitialState: function() {
    return {chat_rooms: [], modalOpened: false};
  },
  componentDidMount: function() {
    Yak.PusherManager.addChannelGroup('Rooms',
      [
        {eventName: "new_room", callback:  this.handlePusherNewRoom},
        {eventName: "remove_room", callback: this.handlePusherRemoveRoom}
      ]
    );
    this.RoomsPusher = Yak.PusherManager.channelGroup["Rooms"]
    this.RoomsPusher.subscribe('chat_rooms')
    this.fetchRoomsFromServer();
  },  
  componentWillUnmount: function() {
    this.RoomsPusher.unsubscribe();
  },
  fetchRoomsFromServer: function() {
    Yak.backend.fetch('chat_rooms.json').then(function(data) {
      this.setState({chat_rooms: data.chat_rooms});
      this.selectFirstRoom();
      // if (this.getParams().room_id === undefined && data.chat_rooms.length > 0){
      //   this.transitionTo('Room', {room_id: data.chat_rooms[0].id});
      // }
    }.bind(this))
  },
  scroll: function(){
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  selectFirstRoom: function() {
    if (this.state.chat_rooms.length > 0) {
      this.transitionTo('Room', {room_id: this.state.chat_rooms[0].id})
    } else {
      this.transitionTo('NoRoom')
    };
  },
  handleAddRoom: function(chat_room) {
    this.addedRoom = chat_room.chat_room.name
    Yak.backend.postJSON('chat_rooms.json', chat_room)
  },
  handlePusherNewRoom: function(new_chat_room){
    this.setState({chat_rooms: this.state.chat_rooms.concat(new_chat_room)});
    if (this.addedRoom == new_chat_room.name){
      this.transitionTo('Room', {room_id: new_chat_room.id});
      this.scroll();
      this.addedRoom=""
    }
  },
  handleRemoveRoom: function(chat_room) {
    Yak.backend.delete('chat_rooms/' + chat_room.id);
  },
  handlePusherRemoveRoom: function(chat_room) {
    this.fetchRoomsFromServer();
    this.hideModal();
  },
  hideModal: function() {
    React.unmountComponentAtNode(document.getElementById('modal'));
  },
  confirmRemoveModalOpen: function(chat_room, index) {
    React.render(<ConfirmRemoveModal
      hideModal={this.hideModal}
      onConfirmClick={this.handleRemoveRoom}
      room={chat_room}
      index={index} />, document.getElementById('modal'));
  },
  render: function() {
    return (
    <div className="rooms-box">
      <h3>Rooms</h3>
      <Yak.Components.RoomList
        chat_rooms={this.state.chat_rooms}
        onRemoveRoomClick={this.confirmRemoveModalOpen} />
      <div className="add-room-form">
        <Yak.Components.RoomForm onAddRoomClick={this.handleAddRoom} />
      </div>
      <div id="modal" />
    </div>
    );
  }
});
