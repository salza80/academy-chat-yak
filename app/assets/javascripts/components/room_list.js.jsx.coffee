Yak.Components.RoomList = React.createClass
  getRoom: (id) ->
    for index in [0..@props.chat_rooms.length]
      return index if @props.chat_rooms[index].id == id
  removeRoom: (room) ->
    @backend = new Yak.Backend()
    this.setState({chat_rooms: this.props.chat_rooms.splice(@getRoom(room.id), 1)})
    @backend.delete('chat_rooms/' + room.id)
  render: ->
    rooms = @props.chat_rooms.map ((room) ->
      `<Yak.Components.Room room={room}
      key={room.id}
      onRemoveRoomClick={this.removeRoom} />`
    ).bind(this)
    `<ul className="nav nav-stacked rooms-list">{rooms}</ul>`
