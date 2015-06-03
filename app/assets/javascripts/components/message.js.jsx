/** @jsx React.DOM */
var Message = React.createClass({
  render: function() {
    return (
      <div className="Message">
        <span className="created_at">
          {this.props.created_at}
        </span>
        {this.props.body}
      </div>
    );
  }
});
