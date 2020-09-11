class API::V1::GuidesController < API::V1::BaseController

  def index
    if params[:q].present?
      @all_guides = Guide.published.fulltext_search(params[:q].to_s).by_relevance
    else
      @all_guides = Guide.published
    end

    @rows = params[:rows].present? ? params[:rows].to_i : 20
    @page = params[:page].present? ? params[:page].to_i : 1

    @guides = @all_guides.page(@page).per(@rows)

    render jsonapi: @guides,
      fields: {
        guides: [
          :id,
          :title,
          :background_color,
          :about,
          :purpose,
          :looking_for_collaborators,
          :complete_or_wip,
          :author,
          :updated,
          :nara_approved,
          :audience_ids
        ]
      },
      meta: {
        # total: @all_guides.length,
        pages: @guides.total_pages,
        page: @page,
        rows: @rows
      }
  end

  def create
    #TODO: parse params for potential descriptions that might be added on creation
    @guide = Guide.create(user_id: current_user.id)

    puts @guide.errors.messages

    render jsonapi: @guide,
      fields: {
        guides: [
          :id
        ]
      }
  end

  def update
    @guide = Guide.find_by_id(params[:id])

    if @guide.update(guide_params)
      render jsonapi: @guide,
        fields: {
          guides: [
            :id,
            :title,
            :background_color,
            :about,
            :purpose,
            :looking_for_collaborators,
            :complete_or_wip,
            :author,
            :audience_names,
            :updated,
            :nara_approved,
            :audience_ids
          ]
        }
    end
  end

  def edit
    #TODO: only find within guides that belong to the current user or by collaborations
    @guide = Guide.find_by_id(params[:id]) or return http404

    render jsonapi: @guide,
      fields: {
        guides: [
          :id,
          :title,
          :background_color,
          :about,
          :purpose,
          :looking_for_collaborators,
          :complete_or_wip,
          :author,
          :audience_names,
          :updated,
          :status,
          :nara_approved,
          :audience_ids
        ]
      }
  end

  def show
    @guide = Guide.published.find_by_id(params[:id])

    unless @guide
      @guide = current_user.guides.find_by_id(params[:id]) or return http404
    end

    render jsonapi: @guide,
      fields: {
        guides: [
          :id,
          :title,
          :background_color,
          :about,
          :purpose,
          :looking_for_collaborators,
          :complete_or_wip,
          :author,
          :audience_names,
          :updated,
          :nara_approved,
          :audience_ids,
        ]
      }
  end

  private

  def guide_params
    params.require(:guide).permit(
      :title,
      :background_color,
      :about,
      :purpose,
      :complete_or_wip,
      :looking_for_collaborators,
      :status,
      audience_ids: [],
    )
  end

end
