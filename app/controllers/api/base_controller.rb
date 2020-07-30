class API::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token

  private

  def current_user
    User.find_by_auth_token(cookies[:auth_token])
  end
end