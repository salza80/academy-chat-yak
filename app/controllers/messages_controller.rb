class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :logged_in

  def index
    @messages = Message.all
    @message = Message.new
    respond_to do |format|
      format.html
      format.json { render json: @messages, :include => :user }
    end
  end

  def create
    @message = Message.new message_params
    @message.user = current_user
    @message.save
    Pusher.url = "http://fdac954e72641ea1c7c7:1e5b8ed7a5ce477638db@api.pusherapp.com/apps/123041"

    Pusher['test_channel'].trigger('my_event', {})
    redirect_to '/'
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end
end
