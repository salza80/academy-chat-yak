class Api::ChatRoomsController < ApplicationController
  def index
    @chat_rooms = ChatRoom.active
  end

  def create
    @chat_room = ChatRoom.create(chat_room_params)
    pusher_trigger('new_room')
  end

  def destroy
    @chat_room = ChatRoom.find(params[:id])
    if @chat_room.messages.empty?
      @chat_room.destroy
    else
      @chat_room.update(removed: true)
    end
    pusher_trigger('remove_room')
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:name)
  end

  def pusher_trigger(event)
    Pusher['chat_rooms'].trigger(
      event,
      render_to_string(
        partial: 'api/chat_rooms/chat_room.json',
        locals: { chat_room: @chat_room })
    )
  end
end
