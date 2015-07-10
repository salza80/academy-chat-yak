var Navigation = ReactRouter.Navigation;
var State = ReactRouter.State;

Yak.Components.RoomBox = React.createClass({
  mixins: [Navigation, State ],
  getInitialState: function() {
    return {chat_rooms: []};
  },
  componentWillReceiveProps: function(props) {
   this.checkSelectedRoom();
  },
  onRoomListChange: function(data){
    this.setState({chat_rooms: data.chat_rooms}, this.checkSelectedRoom);
  },
  componentDidMount: function() {
    this.unsubscribe = Yak.Stores.RoomsStore.listen(this.onRoomListChange);
    Yak.PusherManager.addChannelGroup('Rooms',
      [
        {eventName: "new_room", callback:  this.handlePusherNewRoom},
        {eventName: "remove_room", callback: this.handlePusherRemoveRoom}
      ]
    );
    this.RoomsPusher = Yak.PusherManager.channelGroup.Rooms;
    this.RoomsPusher.subscribe('chat_rooms');
    Yak.Actions.RoomActions.Load();
  },  
  componentWillUnmount: function() {
    this.unsubscribe();
    this.RoomsPusher.unsubscribe();
  },
  checkSelectedRoom: function(ignoreDefaultRoot) {
    if (this.getParams().room_id === undefined){
      this._selectFirstRoom();
      return;
    } 
    if (this.new_room_name !== undefined){
      new_room = this._findRoom("name", this.new_room_name)
      if(new_room !== undefined){
        this.transitionTo('Room', {room_id: new_room.id})
        this.new_room_name = undefined;
      }
    } else {
      this._checkRoomExists()
    }
  },
  scroll: function(){
    var node = this.getDOMNode();
    node.scrollTop = node.scrollHeight;
  },
  _checkRoomExists: function(){
    if (this._findRoom("id", this.getParams().room_id) === undefined){
      this._selectFirstRoom();
    }
  },
  _selectFirstRoom: function() {
    if (this.state.chat_rooms.length > 0) {
      this.transitionTo('Room', {room_id: this.state.chat_rooms[0].id})
    } else {
      this.transitionTo('NoRoom')
    };
  },
  _findRoom: function(property, value) {
    var i;
    for (i = 0; i < this.state.chat_rooms.length; i = i+1) { 
      if (this.state.chat_rooms[i][property] == value){
        return this.state.chat_rooms[i]
      }
    }
    return undefined;
  },
  handleAddRoom: function(data) {
    this.new_room_name = data.chat_room.name;
    Yak.Actions.RoomActions.AddRoom(data.chat_room);
  },
  handleRemoveRoom: function(chat_room) {
    Yak.Actions.RoomActions.RemoveRoom(chat_room)
    this.hideModal();
  },
  handlePusherNewRoom: function(new_room) {
    Yak.Actions.RoomActions.PusherNewRoom(new_room);
  },
  handlePusherRemoveRoom: function(removed_room) {
    Yak.Actions.RoomActions.PusherRemoveRoom(removed_room);
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
