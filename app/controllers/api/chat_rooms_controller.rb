class Api::ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.all
  end
end
