var Yak = Yak || {};

Yak.PusherManager = function() {
  this.pusher = new Pusher(Yak.CONST.PUSHER_KEY);
  this.channelGroup = {};
};
Yak.PusherManager.prototype.addChannelGroup = function (groupName, events){
  this.channelGroup[groupName] = new Yak.ChannelGroupManager(this.pusher, events);
};

Yak.ChannelGroupManager = function(pusher, events){
  this.pusher = pusher;
  this.channelName = undefined;
  this.channel = undefined;
  this.events = events || [];
  this.bindEvents = function(){
    var i;
    for (i = 0; i < this.events.length; i = i+1) { 
      this.bindEvent(this.events[i]);
    }
  };
  this.bindEvent = function(event){
    this.channel.bind(event.eventName, event.callback);
  };
};
Yak.ChannelGroupManager.prototype.subscribe = function(newChannelName) {
  this.unsubscribe();
  this.channelName = newChannelName;
  this.channel = this.pusher.subscribe(newChannelName);
  this.bindEvents();
};
Yak.ChannelGroupManager.prototype.unsubscribe = function() {
  if (this.channelName !== undefined){ this.pusher.unsubscribe(this.channelName); }
};
Yak.ChannelGroupManager.prototype.addEvent = function(eventName, callback) {
  var newEvent = {"eventName": eventName, "callback": callback};
  this.events.push(newEvent);
  if (this.channel !== undefined){ this.bindEvent(newEvent); }
};
