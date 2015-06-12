Yak.pusherInit = function() {
  this.pusher = new Pusher(Yak.CONST.PUSHER_KEY);
  this.channel = this.pusher.subscribe('test_channel');  
};
