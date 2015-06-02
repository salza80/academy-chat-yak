class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in

  def current_user
    session[:id] ? User.find(session[:id]) : nil
  end

  def logged_in
    redirect_to login_path if session[:id].nil?
  end
end
