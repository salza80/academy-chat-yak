Yak.Components.RoomList = React.createClass
  removeRoom: (chat_room) ->
    @props.onRemoveRoomClick(chat_room)
  render: ->
    rooms = @props.chat_rooms.map ((room) =>
      <Yak.Components.Room room={room}
      key={room.id}
      onRemoveRoomClick={this.removeRoom} />
    )
    <div className="list-group rooms-list">{rooms}</div>
