Yak.Stores.MessagesStore = Reflux.createStore({
// this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
  listenables: [Yak.Actions.MessageActions],
  init: function(){
    this.data = this.getInitialState()
  },
  getInitialState: function() {
    return  {
      messages: [],
      selected_room: {"id": 0, "name": "", "channel":""},
      all_messages_loaded: true,
      users: [],
      scroll: undefined
    };
  },
  onLoadCompleted: function(data) {
    this.data.messages = data.messages;
    this.data.selected_room = data.selected_room;
    this.data.all_messages_loaded = data.all_messages_loaded;
    this.data.users = [];
    this.data.scroll = "down";
    this.trigger(this.data);
  },
  onLoadPartCompleted: function(data){
    this.data.messages = data.messages;
    this.data.scroll = "up";
    this.trigger(this.data);
  },
  onLoadFailed: function(data){

  },
  onAddMessageCompleted: function(new_message) {
  },
  onAddMessageFailed: function(new_message) {
  },
  onPusherNewMessage: function(new_message){
    this.data.messages = this.data.messages.concat(new_message);
    this.data.scroll = "downWhenAtBottom";
    this.trigger(this.data);
  }
});
