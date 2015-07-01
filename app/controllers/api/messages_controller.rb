class Api::MessagesController < ApplicationController
  before_action :logged_in, :set_chat_room

  def index
    @messages = before(params[:last_id]).last(20)
    all_messages?
  end

  def create
    @message = current_user.messages.new(message_params)
    @message.chat_room = @chat_room
    @message.save
    Pusher[@chat_room.channel].trigger(
      'new_message',
      render_to_string(
        partial: 'api/messages/message.json',
        locals: { message: @message })
    )
  end

  private

  def before(last_id)
    last_id ? @chat_room.messages.where('id < ?', last_id) : @chat_room.messages
  end

  def all_messages?
    first_message = @messages.first == @chat_room.messages.first
    @all_messages = @messages.empty? || first_message ? true : false
  end

  def message_params
    params.require(:message).permit(:body)
  end

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end
end
