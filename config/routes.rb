Rails.application.routes.draw do
  resources  :messages, only: [:index, :new, :create]
  root 'messages#index'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
