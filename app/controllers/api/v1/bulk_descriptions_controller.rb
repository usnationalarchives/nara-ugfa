class API::V1::BulkDescriptionsController < API::V1::BaseController

  before_action :set_guide

  def remove
    @guide_section_descriptions = @guide.guide_section_descriptions.where(description_id: params[:description_ids])
    @guide_section_descriptions.destroy_all
    @guide.update(updated_at: Time.now)

    render_guide
  end

  def move
    @guide_section_descriptions = @guide.guide_section_descriptions.where(description_id: params[:description_ids])
    @target_section = @guide.guide_sections.find_by_id(params[:target_section_id]) or return http404
    @guide_section_descriptions.update_all(guide_section_id: @target_section.id)
    @guide.update(updated_at: Time.now)

    render_guide
  end

  private

  def set_guide
    @guide = current_user.guides.find_by_id(params[:guide_id]) or return http404
  end

  def render_guide
    render jsonapi: @guide,
      fields: {
        guides: [
          :id,
          :status,
          :title,
          :updated,
          :updatedAgo
        ]
      }
  end

end