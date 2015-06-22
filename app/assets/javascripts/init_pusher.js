var Yak = Yak || {};

Yak.pusherInit = function(events) {
  this.pusher = new Pusher(Yak.CONST.PUSHER_KEY);
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
Yak.pusherInit.prototype.subscribe = function(newChannelName) {
  this.unsubscribe();
  this.channelName = newChannelName;
  this.channel = this.pusher.subscribe(newChannelName);
  this.bindEvents();
};
Yak.pusherInit.prototype.unsubscribe = function() {
  if (this.channelName !== undefined){ this.pusher.unsubscribe(this.channelName); }
};
Yak.pusherInit.prototype.addEvent = function(eventName, callback) {
  var newEvent = {"eventName": eventName, "callback": callback};
  this.events.push(newEvent);
  if (this.channel !== undefined){ this.bindEvent(newEvent); }
};
