Yak.Components.UserList = React.createClass
  render: ->
    users = @props.users.map ((user) =>
      <Yak.Components.User user={user} key={user.id} />
    )
    <ul className="list-group user-list">{users}</ul>
