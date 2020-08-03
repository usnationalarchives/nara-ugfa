Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Root route
  root to: "root#index";

  namespace :api do
    namespace :v1 do
      post "authenticate", to: "authentication#authenticate"
      delete "logout", to: "authentication#logout"
      get "current-user", to: "users#show"

      scope "/finding-aids" do
        post "/", to: "finding_aids#create"
        get "/:id/edit", to: "finding_aids#edit"
        put "/:id", to: "finding_aids#update"
        delete "/:id", to: "finding_aids#destroy"
      end
    end
  end

  # Catch-all
  match "*path", to: "root#index", via: :all
end
