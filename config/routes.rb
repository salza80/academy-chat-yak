Rails.application.routes.draw do

  scope module: 'api' do
    resources  :messages, only: [:index, :new, :create]
  end
  root 'api/messages#index'
  get '/login', to: 'sessions#new', as: :login
  get '/auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: 'sessions#failure'
  delete 'logout', to: 'sessions#destroy'
end
