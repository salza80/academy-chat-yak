Link = ReactRouter.Link
Yak.Components.Room = React.createClass
  handleRemoveRoomClick: (e) ->
    e.preventDefault()
    @props.onRemoveRoomClick(@props.room)
  render: ->
    `<li className="room-list-item">
      <Link to="Room" params={{room_id: this.props.room.id}}>
        {this.props.room.name}
      </Link>
      <span onClick={this.handleRemoveRoomClick} className="glyphicon glyphicon-remove"></span>
    </li>`
