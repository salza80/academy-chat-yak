var Navigation = ReactRouter.Navigation;
var State = ReactRouter.State;

Yak.Components.RoomBox = React.createClass({
  mixins: [Navigation, State ],
  getInitialState: function() {
    return {chat_rooms: [], ShowDeleteConfirmModal: false, ShowAddConfirmModal: false};
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
    this.confirmModelEle=  React.findDOMNode(this.refs.modal)
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
    if (this.addRoom !== undefined){
      new_room = this._findRoom("name", this.addRoom.name)
      if(new_room !== undefined){
        this.transitionTo('Room', {room_id: new_room.id})
        this.addRoom = undefined;
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
  handleRemoveRoomClick: function(chat_room){
    this.removeRoom = chat_room
    this.setState({ShowDeleteConfirmModal:true})
  },
  handleAddRoomClick: function(chat_room){
    this.addRoom = chat_room
    this.setState({ShowAddConfirmModal:true})
  },
  handleAddRoom: function() {
    Yak.Actions.RoomActions.AddRoom(this.addRoom);
    this.hideModal();
  },
  handleRemoveRoom: function() {
    Yak.Actions.RoomActions.RemoveRoom(this.removeRoom)
    this.hideModal();
  },
  handlePusherNewRoom: function(new_room) {
    Yak.Actions.RoomActions.PusherNewRoom(new_room);
  },
  handlePusherRemoveRoom: function(removed_room) {
    Yak.Actions.RoomActions.PusherRemoveRoom(removed_room);
  },
  hideModal: function() {
    this.setState({ShowDeleteConfirmModal:false, ShowAddConfirmModal:false})
  },
  getModal: function() {
    var modal;
    if (this.state.ShowDeleteConfirmModal){ 
      modal = <ConfirmModal onHide={this.hideModal} 
      onConfirmClick={this.handleRemoveRoom} 
      onCancelClick= {this.hideModal} 
      message="Are you sure you want to delete this room?" />
    }
    if (this.state.ShowAddConfirmModal){ 
      modal = <ConfirmModal onHide={this.hideModal} 
      onConfirmClick={this.handleAddRoom} 
      onCancelClick= {this.hideModal} 
      message= "Are you sure you want to add a new room?" />
    }
    return modal;
  },
  render: function() {
    return (
    <div className="rooms-box">
      <h3>Rooms</h3>
      <Yak.Components.RoomList
        chat_rooms={this.state.chat_rooms}
        onRemoveRoomClick={this.handleRemoveRoomClick} />
      <div className="add-room-form">
        <Yak.Components.RoomForm onAddRoomClick={this.handleAddRoomClick} />
      </div>
      <div id="modal" ref="modal" >  {this.getModal()} </div>
    </div>
    );
  }
});
