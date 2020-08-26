class API::V1::UsersController < API::V1::BaseController

  def show
    if @user = current_user 
      render jsonapi: @user, fields: {
        users: [:id, :name, :email, :catalog_attributes]
      }
    else
      render json: { error: "No current user" }, status: 401
    end

  end
end