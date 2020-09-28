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
    if params[:guide] != {}
      @guide = current_user.guides.create(guide_params)
    else
      @guide = current_user.guides.create
    end

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
            :updatedAgo,
            :nara_approved,
            :audience_ids,
            :status
          ]
        }
    end
  end

  def edit
    #TODO: only find within guides that belong to the current user or by collaborations
    @guide = current_user.guides.find_by_id(params[:id]) or return http404

    render jsonapi: @guide,
      include: [guide_sections: [:descriptions]],
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
          :updatedAgo,
          :status,
          :nara_approved,
          :audience_ids,
          :guide_sections
        ],
        descriptions: [:title, :naId, :thumbnailUrl, :level, :creators, :ancestors, :scopeContent],
        guide_sections: [:id, :title, :weight, :descriptions]
      }
  end

  def show
    @guide = Guide.published.find_by_id(params[:id])

    unless @guide
      @guide = current_user.guides.find_by_id(params[:id]) or return http404
    end

    render jsonapi: @guide,
      include: [guide_sections: [:descriptions]],
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
          :guide_sections
        ],
        descriptions: [:title, :naId, :thumbnailUrl, :level, :creators, :ancestors, :scopeContent],
        guide_sections: [:id, :title, :weight, :descriptions]
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
      guide_sections_attributes: [
        :id,
        :_destroy,
        :title,
        description_ids: []
      ]
    )
  end

end
