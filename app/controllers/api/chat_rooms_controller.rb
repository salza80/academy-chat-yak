class Api::ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.all.select { |room| !room.removed }
  end

  def create
    @chat_room = ChatRoom.create(chat_room_params)
    Pusher['chat_rooms'].trigger(
      'new_room',
      render_to_string(
        partial: 'api/chat_rooms/chat_room.json',
        locals: { chat_room: @chat_room })
    )
  end

  def destroy
    chat_room = ChatRoom.find(params[:id])
    if chat_room.messages.empty?
      chat_room.destroy
    else
      chat_room.removed = true
    end
  end

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end
end
