class SessionsController < ApplicationController
  before_action :logged_in, only: :established

  def new
  end

  def create
    session[:id] = User.find_or_create_by(name: params[:name]).id
    binding.pry
    redirect_to root_path
  end

  def destroy
    session[:id] = nil
    binding.pry
    redirect_to root_path
  end

  def established
  end
end
