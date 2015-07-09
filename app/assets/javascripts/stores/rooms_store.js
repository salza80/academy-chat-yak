Yak.Stores.RoomsStore = Reflux.createStore({
// this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
  listenables: [Yak.Actions.RoomActions],
  init: function(){
    Yak.PusherManager.addChannelGroup('Rooms',
      [
        {eventName: "new_room", callback:  this.handlePusherNewRoom},
        {eventName: "remove_room", callback: this.handlePusherRemoveRoom}
      ]
    );
    this.RoomsPusher = Yak.PusherManager.channelGroup.Rooms;
    this.RoomsPusher.subscribe('chat_rooms');
  },
  getInitialState: function() {
    return {chat_rooms: [] };
  },
  fetchRoomsFromServer: function() {
    return Yak.backend.fetch('chat_rooms.json').then(function(data) {
      this.data = {chat_rooms: data.chat_rooms};
       this.trigger(this.data);
      return Promise.resolve(this.chat_rooms);
    }.bind(this));
  },
  onLoad: function(){
    this.fetchRoomsFromServer();
  },
  onAddRoom: function(chat_room) {
    Yak.backend.postJSON('chat_rooms.json', chat_room);
  },
  handlePusherNewRoom: function(new_chat_room){
    this.data = {chat_rooms: this.data.chat_rooms.concat(new_chat_room)};
    this.trigger(this.data);
  },
  onRemoveRoom: function(chat_room) {
    Yak.backend.delete('chat_rooms/' + chat_room.id);
  },
  handlePusherRemoveRoom: function(chat_room) {
    this.fetchRoomsFromServer();
  }
});
