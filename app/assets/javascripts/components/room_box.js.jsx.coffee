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
  showForm: ->
    @setState addRoom: true
  addRoom: (chat_room) ->
    @backend.postJSON 'chat_rooms.json', chat_room
    @fetchMessagesFromServer()
    @setState addRoom: false
  render: ->
    `<div>
      <h3>Rooms</h3>
      <ul className="nav nav-stacked rooms-list">
        <Yak.Components.RoomList data={this.state.data} />
      </ul>
      <div className="add-room-form">
        <button onClick={this.showForm}>Add Room</button>
        { this.state.addRoom ? <Yak.Components.RoomForm onAddRoomClick={this.addRoom} /> : null }
      </div>
    </div>`
