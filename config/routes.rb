Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Root route
  root to: "root#index";

  namespace :api, defaults: { format: :json } do
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

      scope "/descriptions" do
        get "/", to: "descriptions#index"
        get "/:naid", to: "descriptions#show"
      end

      scope "/guides" do
        get "/", to: "guides#index"
        post "/", to: "guides#create"
        get "/:id", to: "guides#show"
        put "/:id", to: "guides#update"
        get "/:id/edit", to: "guides#edit"
      end

      get "/audiences", to: "audiences#index"
    end
  end

  # Catch-all
  match "*path", to: "root#index", via: :all
end
