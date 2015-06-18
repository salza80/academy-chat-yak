Yak.Components.RoomList = React.createClass
  render: ->
    rooms = @props.data.chat_rooms.map((room) ->
      `<Yak.Components.Room room={room} key={room.id} />`
    )
    `<ul className="rooms-list">{rooms}</ul>`
