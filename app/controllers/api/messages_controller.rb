class Api::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :logged_in, only: :index

  def index
    render partial: 'sessions/new' and return if current_user.nil?
    @messages = Message.all
    @message = Message.new
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = Message.new message_params
    @message.user = current_user
    @message.save
    Pusher.url = ENV['PUSHER_URL']
    Pusher['test_channel'].trigger('my_event',  render_to_string(partial: 'api/messages/message.json', locals: { message: @message}))
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end
end
