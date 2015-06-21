class Api::MessagesController < ApplicationController
  before_action :logged_in, :set_chat_room

  def index
    if (params[:last_id].nil?)
      @messages = @chat_room.messages.last(5)
    else
      @messages = @chat_room.messages.select { |m| m.id < params[:last_id].to_i }.last(5)
    end
    if @messages.empty?
      @all_messages = true
    else
      @all_messages = @messages.first.id == Message.first.id ? true : false
    end
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

  def message_params
    params.require(:message).permit(:body)
  end

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end
end
