Yak.Components.Room = React.createClass
  handleClick: (e) ->
    e.preventDefault()
    PubSub.publish('room_click', this.props.room.id);
  render: ->
    `<li onClick={this.handleClick}>{this.props.room.name}</li>`
