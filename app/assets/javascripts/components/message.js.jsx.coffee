Yak.Components.Message = React.createClass
  render: ->
    `<div className="message">
      <div className="message-head">
        <b>{this.props.user}&nbsp;</b>
        {this.props.created_at}
      </div>
      <div className="message-body">
      {this.props.body}
      </div>
    </div>`

