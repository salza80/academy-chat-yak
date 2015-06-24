Yak.Components.Room = React.createClass
  handleClick: (e) ->
    e.preventDefault()
    # PubSub.publish('room_click', { id : this.props.room.id, channel:  this.props.room.channel })
    @props.onRoomClick(@props.room)
  handleRemoveRoomClick: (e) ->
    e.preventDefault()
    @props.onRemoveRoomClick(@props.room)
  render: ->
    className = "room-list-item"
    if (@props.selected)
      className = className + " selected"
    `<span className={className}>
      <li onClick={this.handleClick}>{this.props.room.name}</li>
      <span onClick={this.handleRemoveRoomClick} className="glyphicon glyphicon-remove"></span>
    </span>`
