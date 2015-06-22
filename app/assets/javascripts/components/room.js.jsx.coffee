Yak.Components.Room = React.createClass
  handleClick: (e) ->
    e.preventDefault()
    # PubSub.publish('room_click', { id : this.props.room.id, channel:  this.props.room.channel })
    this.props.onRoomClick(this.props.room)
  render: ->
    className = "room-list-item"
    if (@props.selected)
      className = className + " selected"
    `<li className={className} onClick={this.handleClick}>{this.props.room.name}</li>`
