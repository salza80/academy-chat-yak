// // first we import some components
// import { Router, Route, Link } from 'react-router';
// // the histories are imported separately for smaller builds
// import HashHistory from 'react-router/lib/HashHistory';

var Router = ReactRouter;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

Yak.Components.MyRoutes = (
  <Route name="Application" path="/" handler={Yak.Components.Application}>
    <DefaultRoute handler={Yak.Components.NoRoomFound} />
    <Route name="NoRoom" path="/room/" handler={Yak.Components.NoRoomFound} />
    <Route name="Room" path="/room/:room_id" handler={Yak.Components.MessageBox} />
    <NotFoundRoute handler={Yak.Components.NoRoomFound} />
  </Route>

);

