Rails.application.routes.draw do
  root 'home#index'
  scope '/api', module: 'api' do
    resources  :messages, only: [:index, :new, :create]
  end
  get '/home', to: 'home#index'
  get '/login', to: 'sessions#new', as: :login
  get '/auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: 'sessions#failure'
  delete 'logout', to: 'sessions#destroy'
end
