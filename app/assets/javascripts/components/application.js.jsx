var RouteHandler = ReactRouter.RouteHandler;

Yak.Components.Application = React.createClass({
  getInitialState: function() {
    return {messages: [], chat_rooms: [], selected_room: {"id": 0, "name": "", "channel":""}, all_messages_loaded: true};
    
  },
  componentDidMount: function() {

  },  
  componentWillUnmount: function() {
  },

  render: function() {
    return (
      <div className = "page-container">
        <Yak.Components.Header />
        <div className = 'container-fluid container application-container'>
          <div className ='row'>
            <div className='col-sm-2 rooms-col'>
              <Yak.Components.RoomBox />
            </div>
            <div className='col-sm-10 messages-col'>
              <RouteHandler/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
