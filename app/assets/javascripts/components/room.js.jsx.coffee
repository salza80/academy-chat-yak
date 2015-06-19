Yak.Components.Room = React.createClass
  handleClick: (e) ->
    e.preventDefault()
    PubSub.publish('room_click', { id : this.props.room.id, channel:  this.props.room.channel })
  render: ->
    `<li className="chat-room-item" onClick={this.handleClick}>{this.props.room.name}</li>`
