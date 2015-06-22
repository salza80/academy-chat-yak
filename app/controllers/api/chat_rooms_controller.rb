class Api::ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.all
  end

  def create
    @chat_room = ChatRoom.create(chat_room_params)
  end

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end
end
