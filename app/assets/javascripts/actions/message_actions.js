Yak.Actions.MessageActions = Reflux.createActions([
  "PusherNewMessage",
  "LoadUserList",
  "UserJoinsRoom",
  "UserLeavesRoom"
]);

// this creates 'load', 'load.completed' and 'load.failed'
Yak.Actions.MessageActions.AddMessage = Reflux.createAction(
  { asyncResult: true }
);
Yak.Actions.MessageActions.Load = Reflux.createAction(
  { asyncResult: true }
);
Yak.Actions.MessageActions.LoadPart = Reflux.createAction(
  {asyncResult:true}
);

Yak.Actions.MessageActions.AddMessage.listen(function(room_id, new_message) {
  Yak.backend.postJSON('chat_rooms/' + room_id + '/messages.json', new_message)
  .then( this.completed )
  .catch( this.failed );
});

Yak.Actions.MessageActions.Load.listen( function(room_id) {
 Yak.backend.fetch('chat_rooms/' + room_id  + '/messages.json')
  .then( this.completed )
  .catch( this.failed );
});

Yak.Actions.MessageActions.LoadPart.listen( function(room_id, last_id) {
 Yak.backend.fetch('chat_rooms/' + room_id  + '/messages.json?last_id=' + last_id)
  .then( this.completed )
  .catch( this.failed );
});

