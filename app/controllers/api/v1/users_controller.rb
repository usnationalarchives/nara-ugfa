class API::V1::UsersController < API::V1::BaseController

  def show
    if @user = current_user
      render jsonapi: @user,
        include: :guides,
        fields: {
          guides: [:id, :title, :status, :updated, :nara_approved, :pending, :background_image_url],
          users: [:id, :name, :email, :catalog_attributes, :role, :gravatar, :guides, :admin]
        }
    else
      render json: { error: "No current user" }, status: 401
    end
  end
end
