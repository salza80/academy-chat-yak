class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :logged_in, only: :index

  def index
    redirect_to login_path and return if current_user.nil?
    @messages = Message.all
  end
end
