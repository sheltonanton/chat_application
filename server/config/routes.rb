Rails.application.routes.draw do
  namespace :api do
    resources :messages
    resources :users
    post 'auth/login'
  end
end
