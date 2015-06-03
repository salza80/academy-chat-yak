@Message = React.createClass
  render: ->
    `<div className="message">
      <span className="message-head">
        {this.props.created_at}
      </span>
      {this.props.body}
    </div>`

