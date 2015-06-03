class MessagesController < ApplicationController
  before_action :logged_in

  def index
    @messages = Message.all.where(user_id: session[:id])
    @message = Message.new
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
