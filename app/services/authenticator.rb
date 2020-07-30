##
# This class represents a client to make requests to the NARA Catalog v1
class Authenticator

  attr_accessor :errors

  def initialize
    @base_url = ENV.fetch("NARA_CATALOG_API_URL")
    @errors = [];
  end

  def authenticate!(authorization_header)
    # Split the header value from format "Basic ENCODED_CREDENTIALS"
    encoded_credentials = authorization_header.split(" ").last
    
    # decode credentials into format "username:password"
    decoded_credentials = Base64.decode64(encoded_credentials)

    # split at the first ":" and get the username
    username = decoded_credentials.split(":").first

    # only split the password into 2 parts at the first occurrence of ":"
    # in case the password contains a colon
    password = decoded_credentials.split(":", 2).last

    login_url = "#{@base_url}/login"
    request_params = {
      user: username,
      password: password
    }

    # Send an authentication request to the Catalog API
    response = Faraday.post(login_url, request_params)
    
    puts response.body

    parsed_response = JSON.parse(response.body)

    catalog_user = parsed_response.try(:[], "opaResponse").try(:[], "user")

    if catalog_user
      @user = find_or_initialize_user(catalog_user)

      if @user.save
        return {
          user: {
            name: @user.name,
            email: @user.email,
            catalog_attributes: @user.catalog_attributes,
            access_token: JsonWebToken.encode(user_auth_token: @user.auth_token)
          }
        }
      else
        @errors = @user.errors

        return false
      end
    end

    @errors.push "Invalid Credentials"

    false
  end

  private

  def find_or_initialize_user(catalog_user)
    user = User.find_or_initialize_by(catalog_id: catalog_user["internalId"])

    user.attributes = {
      email: catalog_user["email"],
      name: catalog_user["fullName"],
      catalog_attributes: catalog_user
    }

    return user
  end

end