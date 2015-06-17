Yak.Components.RoomBox = React.createClass({
  getInitialState: function () {
    return {data: {chat_rooms: []}};
  },
  fetchMessagesFromServer: function() {
    this.backend.fetch('chat_rooms.json').then(function(data){
      this.setState({data: data});
    }.bind(this))
  },
  componentDidMount: function() {
    this.backend = new Yak.Backend();
    this.fetchMessagesFromServer();
  },
  render: function() {
    return (
      <div>
        <h3>Rooms</h3>
        <ul className="nav nav-stacked rooms-list">
          <Yak.Components.RoomList data={this.state.data} />
        </ul>
      </div>
    );
  }
});
