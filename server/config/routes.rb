Rails.application.routes.draw do
  namespace :api do
    resources :messages
    resources :users
    resource :user, only: [] do
      post :login
    end
  end
end
