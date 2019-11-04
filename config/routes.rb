Rails.application.routes.draw do

  
  namespace :api, defaults: {format: :json} do
      resources :users, only: [:create] do
        resources :companies, only: [:index]
      end
      resource :session, only: [:create, :destroy]
      resources :transactions, only: [:create,:index, :show]
      resources :companies, only: [:index, :show]
      resources :watchlists, only: [:index, :create, :destroy]
  end


  root to: "static_pages#root"

end
