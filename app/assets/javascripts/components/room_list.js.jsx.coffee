Yak.Components.RoomList = React.createClass
  getRoom: (id) ->
    for index in [0..@props.chat_rooms.length]
      return index if @props.chat_rooms[index].id == id
  removeRoom: (room) ->
    this.setState({chat_rooms: this.props.chat_rooms.splice(@getRoom(room.id), 1)})
    Yak.backend.delete('chat_rooms/' + room.id)
  render: ->
    rooms = @props.chat_rooms.map ((room) ->
      `<Yak.Components.Room room={room}
      key={room.id}
      onRemoveRoomClick={this.removeRoom} />`
    ).bind(this)
    `<div className="list-group rooms-list">{rooms}</div>`
