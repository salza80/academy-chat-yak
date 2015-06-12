class Api::MessagesController < ApplicationController
  before_action :logged_in

  def index
    @messages = Message.all
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
