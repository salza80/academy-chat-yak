class Api::MessagesController < ApplicationController
  before_action :logged_in, :set_chat_room

  def index
    @all_messages = filter(params[:search])
    @messages = before(params[:last_id]).last(20)
    all_messages_loaded?
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

  def filter(query)
    query.nil? ? @chat_room.messages : @chat_room.messages.where('body LIKE ?', "%#{query}%")
  end

  def before(last_id)
    last_id.nil? ? @all_messages : @all_messages.where('id < ?', last_id)
  end

  def all_messages_loaded?
    first_message = @messages.first == @all_messages.first
    @all_messages_loaded = @messages.empty? || first_message ? true : false
  end

  def message_params
    params.require(:message).permit(:body)
  end

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end
end
