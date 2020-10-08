class API::V1::GuidesController < API::V1::BaseController

  def index
    if params[:q].present?
      @all_guides = Guide.published.fulltext_search(params[:q].to_s).by_relevance
    elsif params[:pending] == "true"
      @all_guides = Guide.pending_moderation
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
          :pending,
          :audience_ids,
          :uuid
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
          :id,
          :uuid
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
            :pending,
            :audience_ids,
            :status,
            :uuid,
            :background_image
          ]
        }
    end
  end

  def edit
    #TODO: only find within guides that belong to the current user or by collaborations
    @guide = current_user.guides.find_by_id(params[:id]) or return http404

    render jsonapi: @guide,
      include: [guide_sections: [:descriptions, :comments, guide_section_descriptions: [:comments, blocks: [:comments]]]],
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
          :pending,
          :audience_ids,
          :guide_sections,
          :uuid,
          :background_image
        ],
        blocks: [:id, :blockable_type, :blockable_id, :block_type, :data, :weight, :unresolved_comments],
        comments: [:id, :commentable_type, :commentable_id, :content, :user_name, :user_email, :created, :gravatar ],
        guide_sections: [:id, :title, :weight, :descriptions, :guide_section_descriptions, :comments],
        guide_section_descriptions: [:id, :guide_section_id, :description_id, :blocks, :comments],
        descriptions: [:title, :naId, :thumbnailUrl, :level, :creators, :ancestors, :scopeContent]
      }
  end

  def show
    @guide = Guide.published.find_by_id(params[:id])

    unless @guide
      @guide = current_user.guides.find_by_id(params[:id]) or return http404
    end

    render jsonapi: @guide,
      include: [guide_sections: [:descriptions, guide_section_descriptions: [:blocks]]],
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
          :pending,
          :audience_ids,
          :guide_sections,
          :uuid,
          :background_image_url
        ],
        blocks: [:id, :blockable_type, :blockable_id, :block_type, :data, :weight],
        guide_sections: [:id, :title, :weight, :descriptions, :guide_section_descriptions],
        guide_section_descriptions: [:id, :guide_section_id, :description_id, :blocks],
        descriptions: [:title, :naId, :thumbnailUrl, :level, :creators, :ancestors, :scopeContent],
      }
  end

  def public
    @guide = Guide.find_by_uuid(params[:uuid]) or return http404

    render jsonapi: @guide,
      include: [guide_sections: [:descriptions, guide_section_descriptions: [:blocks]]],
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
          :pending,
          :audience_ids,
          :guide_sections,
          :uuid,
          :background_image_url
        ],
        blocks: [:id, :blockable_type, :blockable_id, :block_type, :data, :weight],
        guide_sections: [:id, :title, :weight, :descriptions, :guide_section_descriptions],
        guide_section_descriptions: [:id, :guide_section_id, :description_id, :blocks],
        descriptions: [:title, :naId, :thumbnailUrl, :level, :creators, :ancestors, :scopeContent],
      }
  end

  def recommended_guides
    @guide = Guide.find_by_id(params[:id]) or return http404
    if @guide.descriptions.any?
      @description_ids = []
      10.times.map { 
        @description_ids << @guide.descriptions.pluck(:id).sample 
      } 
      @guides = []
      @description_ids.each do |id|
        @guides << Guide.published.includes(:descriptions).where.not(id: @guide.id).where("descriptions.id = ?", "#{id}").references(:descriptions)
      end
      @guides = @guides.flatten.uniq.shuffle.take(3)
    else
      @guides = []
    end

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
          :audience_names,
          :updated,
          :nara_approved,
          :pending,
          :audience_ids,
          :guide_sections,
          :uuid
        ]
      }
  end

  def recommended_descriptions
    @guide = Guide.find_by_id(params[:id]) or return http404

    if @guide.descriptions.any?
      # Pick 3 random description records from the Guide
      @guide_descriptions = []
      3.times.map { 
        @guide_descriptions << @guide.descriptions.sample
      }

      # Use the 3 descriptions to find related descriptions
      @recommended_descriptions = []
      @guide_descriptions.each do |description|
        case description.level
        when "item"
          @recommended_descriptions << Description.where("data->'parentSeries'->>'naId' = ?", "#{description.data["parentSeries"]["naId"]}").limit(5)
        when "series"
          @recommended_descriptions << Description.where("data->'parentCollection'->>'naId' = ?", "#{description.data["parentCollection"]["naId"]}").limit(5)
        when "collection"
          @recommended_descriptions << Description.where("data->'parentCollection'->>'naId' = ?", "#{description.naid}").limit(5)
        when "fileUnit"
          @recommended_descriptions << Description.where("data->'parentSeries'->>'naId' = ?", "#{description.data["parentSeries"]["naId"]}").limit(5)
        when "itemAv"
          @recommended_descriptions << Description.where("data->'parentCollection'->>'naId' = ?", "#{description.data["parentCollection"]["naId"]}").limit(5)
        end
      end

      @descriptions = @recommended_descriptions.flatten.uniq.shuffle.take(3)
    else
      @descriptions = []
    end

    render jsonapi: @descriptions,
      fields: {
        descriptions: [
          :id,
          :naId,
          :title,
          :scopeContent,
          :level,
          :data
        ]
      }
  end

  private

  def guide_params
    params.require(:guide).permit(
      :title,
      :background_color,
      :background_image,
      :about,
      :purpose,
      :complete_or_wip,
      :pending,
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
