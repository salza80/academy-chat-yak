Yak.Components.Message = React.createClass
  getTimeAgo: ->
    moment.utc(this.props.created_at).fromNow()
  render: ->
    <div className="message">
      <div className="message-head">
        <b>{this.props.user}</b>
        <time dateTime={this.props.created_at}>{this.getTimeAgo()}</time>
      </div>
      <div className="message-body">
      {this.props.body}
      </div>
    </div>

