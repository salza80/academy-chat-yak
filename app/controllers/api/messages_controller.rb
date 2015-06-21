class Api::MessagesController < ApplicationController
  before_action :logged_in, :set_chat_room

  def index
    messages = params[:last_id].nil? ? @chat_room.messages : find_older
    @messages = messages.last(5)
    @all_messages = @messages.empty? || @messages.first.id == Message.first.id ? true : false
  end

  def create
    @message = current_user.messages.new(message_params)
    @message.chat_room = @chat_room
    @message.save
    Pusher.url = ENV['PUSHER_URL']
    Pusher[@chat_room.channel].trigger(
      'new_message',
      render_to_string(
        partial: 'api/messages/message.json',
        locals: { message: @message })
    )
  end

  private

  def find_older
    @chat_room.messages.select { message.id < params[:last_id].to_i }
  end

  def message_params
    params.require(:message).permit(:body)
  end

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end
end
