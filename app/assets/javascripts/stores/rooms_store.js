Yak.Stores.RoomsStore = Reflux.createStore({
// this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
  listenables: [Yak.Actions.RoomActions],
    init: function(){
  },
  getInitialState: function() {
    return {chat_rooms: []};
  },
  onLoadCompleted: function(data) {
    this.data = {chat_rooms: data.chat_rooms};
    this.trigger(this.data);
  },
  onAddRoomCompleted: function(new_chat_room) {
 
  },
  onAddRoomFailed: function(chat_rooms) {
    //
  },
  onRemoveRoomCompleted: function() {

  },
  onRemoveRoomFailed: function(){

  },
  onPusherNewRoom: function(new_room){
    this.data = {chat_rooms: this.data.chat_rooms.concat(new_room)};
    this.trigger(this.data);
  },
  onPusherRemoveRoom: function(removed_room){
    var rooms = this.data.chat_rooms.filter(function(room){
      return room.id !== removed_room.id;
    });
    this.data = {chat_rooms: rooms};
    this.trigger(this.data);
  }
});
