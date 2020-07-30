class API::V1::AuthenticationController < API::V1::BaseController

  def  authenticate
    authorization_header = request.headers["Authorization"]

    client = Authenticator.new
    if @user = client.authenticate!(authorization_header)
      render json: @user, status: 200
    else
      render json: { errors: client.errors }, status: 401
    end

  end
end