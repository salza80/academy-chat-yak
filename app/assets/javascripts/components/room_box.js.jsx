var Navigation = ReactRouter.Navigation;
var State = ReactRouter.State;

Yak.Components.RoomBox = React.createClass({
  mixins: [Navigation, State ],
  getInitialState: function() {
    return {chat_rooms: []};
  },
  onRoomListChange: function(data){
    this.setState({chat_rooms: data.chat_rooms});
    if (this.getParams().room_id === undefined && data.chat_rooms.length > 0){
      this.selectFirstRoom();
    }
  },
  componentDidMount: function() {
    this.unsubscribe = Yak.Stores.RoomsStore.listen(this.onRoomListChange);
    Yak.Actions.RoomActions.Load();
  },  
  componentWillUnmount: function() {
    this.unsubscribe();
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
  redirectFromRemovedRoom: function(chat_room) {
    if (this.getParams().room_id == chat_room.id.toString()) {
      this.selectFirstRoom();
    }
  },
  handleAddRoom: function(chat_room) {
    this.addedRoom = chat_room.chat_room.name
    Yak.Actions.RoomActions.AddRoom(chat_room.chat_room);
  },
  handleRoomAdded: function(new_chat_room){
  // if (this.addedRoom == new_chat_room.name){
  //     this.transitionTo('Room', {room_id: new_chat_room.id});
  //     this.scroll();
  //     this.addedRoom=""
  //   }
  },
  handleRemoveRoom: function(chat_room) {
    Yak.Actions.RoomActions.RemoveRoom(chat_room)
    this.hideModal();
  },
  handleRoomRemoved: function(chat_room) {
    this.redirectFromRemovedRoom(chat_room); 
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
