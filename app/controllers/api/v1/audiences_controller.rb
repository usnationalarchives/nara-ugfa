class API::V1::AudiencesController < API::V1::BaseController

  def index
    @audiences = Audience.all

    render jsonapi: @audiences,
      fields: {
        audiences: [:name]
      }
  end

end
