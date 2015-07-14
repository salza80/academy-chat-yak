Link = ReactRouter.Link
State = ReactRouter.State;
Yak.Components.Room = React.createClass
  mixins: [State ]
  componentDidMount:->
    @scrollIntoview()
  componentWillUpdate: ->
    @scrollIntoview()
  scrollIntoview: -> 
    if @props.room.id.toString() == @getParams().room_id
      roomEle = React.findDOMNode(this.refs.room)
      RoomBox = roomEle.parentNode.parentNode
      RoomBox.scrollTop = roomEle.offsetTop - RoomBox.offsetTop;
  handleRemoveRoomClick: (e) ->
    e.preventDefault()
    @props.onRemoveRoomClick(@props.room)
  render: ->
    <Link className="list-group-item room-list-item" ref="room" to="Room" params={{room_id: this.props.room.id}}>
      {this.props.room.name}
      <span onClick={this.handleRemoveRoomClick} className="glyphicon glyphicon-remove"></span>
    </Link>
      
