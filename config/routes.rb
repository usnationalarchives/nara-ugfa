Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Root route
  root to: "root#index";

  namespace :api do
    namespace :v1 do
      post "authenticate", to: "authentication#authenticate"
      delete "logout", to: "authentication#logout"
      get "current-user", to: "users#show"
    end
  end

  # Catch-all
  match "*path", to: "root#index", via: :all
end
