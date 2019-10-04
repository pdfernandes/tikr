Rails.application.routes.draw do

  
  namespace :api, defaults: {format: :json} do
      resources :users, only: [:create]
      resource :session, only: [:create, :destroy]
      resources :transactions, only: [:create,:index, :show]
      resources :companies, only: [:index, :show]
  end


  root to: "static_pages#root"

end
