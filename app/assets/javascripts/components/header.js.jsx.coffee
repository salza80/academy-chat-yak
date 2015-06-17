Yak.Components.Header = React.createClass
  render: ->
    if (@props.user)
      logout = `<a href="logout">Log out</a>`
    `<div className="navbar navbar-static-top header">
        <div className="container-fluid">
          <div className="navbar-header navbar-left">
            <span className="navbar-bran">Yak Chat</span>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                {logout}
              </li>
            </ul>
          </div>
        </div>
      </div>`
      