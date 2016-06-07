Rails.application.routes.draw do
  # Auth
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'logout', to: 'sessions#destroy', as: 'logout'

  get 'sessions/create'
  get 'sessions/destroy'

  get 'home/show'

  root to: 'home#show'
end
