Yak.Components.Header = React.createClass
  render: ->
    `<div className="navbar navbar-static-top header">
        <div className="container-fluid">
          <div className="navbar-header navbar-left">
            <span className="navbar-bran">Yak Chat</span>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="logout">Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>`
