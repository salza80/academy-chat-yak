Rails.application.routes.draw do

  scope '/api', module: 'api' do
    resources  :messages, only: [:index, :new, :create]
  end
  root 'home#index'
  get '/home', to: 'home#index'
  get '/login', to: 'sessions#new', as: :login
  get '/auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: 'sessions#failure'
  delete 'logout', to: 'sessions#destroy'
end
