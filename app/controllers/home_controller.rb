class HomeController < ApplicationController
  before_action :logged_in

  def index
    @messages = Message.all
  end
end
