class Api::MessagesController < ApplicationController
  before_action :logged_in, :set_chat_room

  def index
    @messages = @chat_room.messages.all
  end

  def create
    @message = current_user.messages.new(message_params)
    @message.chat_room = @chat_room
    @message.save
    Pusher.url = ENV['PUSHER_URL']
    Pusher['test_channel'].trigger(
      'my_event',
      render_to_string(
        partial: 'api/messages/message.json',
        locals: { message: @message })
    )
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end
end
