Yak.Components.RoomBox = React.createClass
  getInitialState: ->
    { data: chat_rooms: [] }
  fetchMessagesFromServer: ->
    @backend.fetch('chat_rooms.json').then ((data) ->
      @setState data: data
    ).bind(this)
  componentDidMount: ->
    @backend = new (Yak.Backend)
    @fetchMessagesFromServer()
  addRoom: (chat_room) ->
    @backend.postJSON 'chat_rooms.json', chat_room
    @fetchMessagesFromServer()
  render: ->
    `<div>
      <h3>Rooms</h3>
      <Yak.Components.RoomList data={this.state.data} />
      <div className="add-room-form">
        <Yak.Components.RoomForm onAddRoomClick={this.addRoom} />
      </div>
    </div>`
