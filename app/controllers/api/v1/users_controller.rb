class API::V1::UsersController < API::V1::BaseController

  def show
    if @user = current_user 
      render json: { user: JSON.parse(@user.to_json) }
    else
      render json: { error: "No current user" }, status: 401
    end

  end
end