var Yak = Yak || {};

Yak.pusherInit = function() {
  this.pusher = new Pusher(Yak.CONST.PUSHER_KEY);
  this.channelName = undefined;
  this.channel = undefined;
};
Yak.pusherInit.prototype.subscribe = function(newChannelName, callback) {
  this.unsubscribe();
  this.channelName = newChannelName;
  this.channel = this.pusher.subscribe(newChannelName);
  this.channel.bind('new_message', callback);
};
Yak.pusherInit.prototype.unsubscribe = function() {
  if (this.channelName !== undefined){ this.pusher.unsubscribe(this.channelName); }
};

