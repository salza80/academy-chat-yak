class MessagesController < ApplicationController
  before_action :logged_in

  def index

    @messages = Message.all
    @message = Message.new
    respond_to do |format|
      format.html
      format.json { render json: @messages }
    end
  end

  def create
    @message = Message.new message_params
    @message.user = current_user
    @message.save
    redirect_to '/'
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end
end
