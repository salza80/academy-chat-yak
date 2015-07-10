var Modal = ReactBootstrap.Modal;
var ConfirmModal = React.createClass({
  render: function() {
    return(
      <Modal onHide={this.props.onHide} onRequestHide = {this.props.onHide}>
        <div className="modal-body">
          <p>{this.props.message}</p>
          <div className="modal-buttons">
            <button onClick={this.props.onConfirmClick}>Yes</button>
            <button onClick={this.props.onHide}>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
});
