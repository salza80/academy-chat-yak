var Modal = ReactBootstrap.Modal;

var ConfirmRemoveModal = React.createClass({
  removeRoom: function() {
    this.props.onConfirmClick(this.props.room)
  },
  render: function() {
    return(
      <Modal onRequestHide={this.props.hideModal}>
        <div className="modal-body">
          <p>Are you sure?</p>
          <div className="modal-buttons">
            <button onClick={this.removeRoom}>Yes</button>
            <button onClick={this.props.hideModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
});
