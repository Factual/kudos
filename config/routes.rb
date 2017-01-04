# frozen_string_literal: true
Rails.application.routes.draw do
  resources :kudos, only: [:index, :create], constraints: { format: :json }, defaults: { format: :json }

  get 'kudos_app', to: 'kudos_app#index'
  # Auth
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'logout', to: 'sessions#destroy', as: 'logout'

  get 'users/search', to: 'users#search'

  post 'like', to: 'likes#like'
  post 'unlike', to: 'likes#unlike'

  resources :sessions, only: [:new, :create, :destroy]

  get 'home/show'

  root to: 'kudos_app#index'
end
