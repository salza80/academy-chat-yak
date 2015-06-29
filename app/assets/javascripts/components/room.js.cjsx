Link = ReactRouter.Link
Yak.Components.Room = React.createClass
  handleRemoveRoomClick: (e) ->
    e.preventDefault()
    @props.onRemoveRoomClick(@props.room)
  render: ->
    <Link className="list-group-item room-list-item" to="Room" params={{room_id: this.props.room.id}}>
      {this.props.room.name}
      <span onClick={this.handleRemoveRoomClick} className="glyphicon glyphicon-remove"></span>
    </Link>
      
