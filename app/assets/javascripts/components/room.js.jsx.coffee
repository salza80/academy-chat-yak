Yak.Components.Room = React.createClass
  handleClick: (e) ->
    e.preventDefault()
    PubSub.publish('room_click', this.props.room.id);
  render: ->
    nameClass = 'room-' + this.props.room.channel_id
    `<li className={nameClass} onClick={this.handleClick}>{this.props.room.name}</li>`
