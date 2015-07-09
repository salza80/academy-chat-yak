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
    this.RoomsPusher = Yak.PusherManager.channelGroup["Rooms"]
    this.RoomsPusher.subscribe('chat_rooms')
  },
  getInitialState: function() {
    this.fetchRoomsFromServer().then(function(){
      return this.chat_rooms;
    }.bind(this));
  },
  fetchRoomsFromServer: function() {
    return Yak.backend.fetch('chat_rooms.json').then(function(data) {
      console.log(data)
      this.chat_rooms = {chat_rooms: data.chat_rooms};
      this.trigger(this.chat_rooms)
      return Promise.resolve(this.chat_rooms);
    }.bind(this));
  },
  onLoad: function(){
    this.fetchRoomsFromServer();
  },
  onAddRoom: function(chat_room) {
    console.log(chat_room)
    Yak.backend.postJSON('chat_rooms.json', chat_room).then(function(){
      this.fetchRoomsFromServer();
    }.bind(this))
  },
  handlePusherNewRoom: function(new_chat_room){
    this.chat_rooms = {chat_rooms: this.chat_rooms.concat(new_chat_room)};
    this.trigger(this.chat_rooms);
  },
  onRemoveRoom: function(chat_room) {
    Yak.backend.delete('chat_rooms/' + chat_room.id);
  },
  handlePusherRemoveRoom: function(chat_room) {
    this.fetchRoomsFromServer()
  }
});
