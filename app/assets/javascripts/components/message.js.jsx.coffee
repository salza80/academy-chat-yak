###* @jsx React.DOM ###
@Message = React.createClass
  render: ->
    `<div className="Message">
      <span className="created_at">
        {this.props.created_at}
      </span>
      {this.props.body}
    </div>`

