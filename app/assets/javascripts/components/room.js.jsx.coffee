Link = ReactRouter.Link
Yak.Components.Room = React.createClass
  render: ->
    `<li className="room-list-item">
      <Link to="Room" params={{room_id: this.props.room.id}}>
        {this.props.room.name}
      </Link>
      </li>`
