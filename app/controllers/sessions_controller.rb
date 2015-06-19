class SessionsController < ApplicationController
  def new
  end

  def create
    r = request.env['omniauth.auth']
    session[:id] = User.find_or_create_by(name: r['info']['nickname']).id if r
    redirect_to root_path
  end

  def destroy
    session[:id] = nil
    redirect_to root_path
  end
end
