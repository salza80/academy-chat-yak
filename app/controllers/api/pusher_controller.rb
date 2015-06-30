class Api::PusherController < ApplicationController
  protect_from_forgery except: :auth
  before_action :auth, :set_pusher

  def auth
    if current_user
      response = Pusher[params[:channel_name]].authenticate(
        params[:socket_id],
        user_id: current_user.id,
        user_info: { name: current_user.name })
      render json: response
    else
      render text: 'Forbidden', status: '403'
    end
  end

  def set_pusher
    Pusher.url = ENV['PUSHER_URL']
  end
end
