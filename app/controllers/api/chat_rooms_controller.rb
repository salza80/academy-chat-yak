class Api::ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.all
  end

  def create
    @chat_room = ChatRoom.create(chat_room_params)
    Pusher.url = ENV['PUSHER_URL']
    Pusher['chat_rooms'].trigger(
      'new_room',
      render_to_string(
        partial: 'api/chat_rooms/chat_room.json',
        locals: { chat_room: @chat_room })
    )
  end

  def destroy
    chat_room = ChatRoom.find(params[:id])
    chat_room.destroy if chat_room.messages.empty?
  end

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end
end
