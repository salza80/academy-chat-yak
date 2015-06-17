Yak.Components.RoomForm = React.createClass
  addRoomClick: (e) ->
    e.preventDefault()
    roomName = React.findDOMNode(this.refs.roomName).value.trim()
    this.props.onAddRoomClick({chat_room: {name: roomName}})
    React.findDOMNode(this.refs.roomName).value = ""
  render: ->
    `<div className="room-form">
      <input type="text" placeholder="Room name" ref="roomName" />
      <button onClick={this.addRoomClick}>Add</button>
    </div>`
