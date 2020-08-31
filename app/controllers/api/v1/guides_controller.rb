class API::V1::GuidesController < API::V1::BaseController

  def index
    @guides = Guide.published

    render jsonapi: @guides,
      fields: {
        guides: [:id, :title, :background_color, :about, :purpose, :looking_for_collaborators, :complete_or_wip, :author_name]
      }
  end

  def show
    @guide = Guide.published.find_by_id(params[:id]) or return http404

    render jsonapi: @guide,
      fields: {
        guides: [:id, :title, :background_color, :about, :purpose, :looking_for_collaborators, :complete_or_wip, :author_name]
      }
  end

end