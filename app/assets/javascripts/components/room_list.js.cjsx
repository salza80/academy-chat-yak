Yak.Components.RoomList = React.createClass
  getRoom: (id) ->
    for index in [0..@props.chat_rooms.length]
      return index if @props.chat_rooms[index].id == id
  removeRoom: (chat_room) ->
    @props.onRemoveRoom(chat_room, @getRoom(chat_room.id))
  render: ->
    rooms = @props.chat_rooms.map ((room) =>
      <Yak.Components.Room room={room}
      key={room.id}
      onRemoveRoomClick={this.removeRoom} />
    )
    <div className="list-group rooms-list">{rooms}</div>
