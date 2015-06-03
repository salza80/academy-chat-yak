/** @jsx React.DOM */
var MessageList= React.createClass({
  render: function() {
    var messageNodes = this.props.data.map(function (message) {
      return (
        <Message created_at={message.created_at} body = {message.body}></Message>
      );
    });
    return (
      <div className="messageList">
        {messageNodes}
      </div>
    );
  }
});
