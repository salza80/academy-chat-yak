Yak.Actions.RoomActions = Reflux.createActions([
  "PusherNewRoom",
  "PusherRemoveRoom"
]);

// this creates 'load', 'load.completed' and 'load.failed'
Yak.Actions.RoomActions.AddRoom = Reflux.createAction(
  { asyncResult: true }
);
Yak.Actions.RoomActions.RemoveRoom = Reflux.createAction(
  { asyncResult: true }
);
Yak.Actions.RoomActions.Load = Reflux.createAction(
  { asyncResult: true }
);



Yak.Actions.RoomActions.AddRoom.listen( function(chat_room) {
  Yak.backend.postJSON('chat_rooms.json', chat_room)
  .then( this.completed )
  .catch( this.failed );
});

Yak.Actions.RoomActions.RemoveRoom.listen( function(chat_room) {
  Yak.backend.delete('chat_rooms/' + chat_room.id)
  .then( this.completed )
  .catch( this.failed );
});


Yak.Actions.RoomActions.Load.listen( function() {
  Yak.backend.fetch('chat_rooms.json')
  .then( this.completed )
  .catch( this.failed );
});
