class API::V1::AuthenticationController < API::V1::BaseController

  def  authenticate
    authorization_header = request.headers["Authorization"]

    client = Authenticator.new

    if @user = client.authenticate!(authorization_header)
      user_json = @user.to_json
      cookies["user"] = user_json.to_s
      cookies["auth_token"] = { value: @user.auth_token, httponly: true }
      render json: user_json, status: 200
    else
      render json: { errors: client.errors }, status: 401
    end

  end

  def logout
    cookies.delete :user
    cookies.delete :auth_token
  end
end