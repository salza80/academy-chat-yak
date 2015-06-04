@Message = React.createClass
  render: ->
    `<div className="message">
      <div className="message-head">
        {this.props.user}&nbsp;
        {this.props.created_at}
      </div>
      <div className="message-body">
      {this.props.body}
      </div>
    </div>`

