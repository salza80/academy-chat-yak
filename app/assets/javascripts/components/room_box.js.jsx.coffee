Yak.Components.RoomBox = React.createClass
  render: ->
    `<div>
      <h3>Rooms</h3>
      <Yak.Components.RoomList chat_rooms={this.props.chat_rooms}
        selected_room_id = {this.props.selected_room_id}
        onRoomClick={this.props.onRoomClick} />
      <div className="add-room-form">
        <Yak.Components.RoomForm onAddRoomClick={this.props.onAddRoomClick} />
      </div>
    </div>`
