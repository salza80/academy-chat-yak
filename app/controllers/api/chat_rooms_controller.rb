class Api::ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.all
  end

  def create
    ChatRoom.create(channel_id: rand(1000), name: chat_room_params[:name])
  end

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end
end
