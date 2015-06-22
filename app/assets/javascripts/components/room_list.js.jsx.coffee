Yak.Components.RoomList = React.createClass
  render: ->
    onRoomClick = @props.onRoomClick
    selected_room_id = @props.selected_room_id
    rooms = @props.chat_rooms.map((room) ->
      `<Yak.Components.Room room={room} key={room.id} selected = {selected_room_id == room.id} onRoomClick={onRoomClick} />`
    )
    `<ul className="nav nav-stacked rooms-list">{rooms}</ul>`
