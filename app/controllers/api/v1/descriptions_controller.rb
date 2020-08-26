class API::V1::DescriptionsController < API::V1::BaseController

  def index
    if params[:q].present?
      @all_descriptions = Description.fulltext_search(params[:q].to_s).by_relevance
    else
      @all_descriptions = Description.all
    end
    @rows = params[:rows].present? ? params[:rows].to_i : 20
    @page = params[:page].present? ? params[:page].to_i : 1

    @descriptions = @all_descriptions.page(@page).per(@rows)

    render jsonapi: @descriptions,
      fields: {
        descriptions: [:id, :naId, :title, :title, :scopeContent, :level, :data]
      },
      meta: {
        total: @all_descriptions.length,
        pages: @descriptions.total_pages,
        page: @page,
        rows: @rows
      }
  end

end