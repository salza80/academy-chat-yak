Yak.Components.RoomList = React.createClass
  getInitialState: ->
    {selected_room_id: 0 }
  handleRoomClick: (room_id) ->
    this.setState({selected_room_id: room_id})
  render: ->
    handleRoomClick = this.handleRoomClick
    selected_room_id = this.state.selected_room_id
    rooms = @props.data.chat_rooms.map((room) ->
      `<Yak.Components.Room room={room} key={room.id} selected = {selected_room_id == room.id} onRoomClick={handleRoomClick} />`
    )
    `<ul className="nav nav-stacked rooms-list">{rooms}</ul>`
