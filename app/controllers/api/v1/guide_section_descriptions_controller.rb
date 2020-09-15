class API::V1::GuideSectionDescriptionsController < API::V1::BaseController

  def add
    @guide = current_user.guides.find_by_id(params[:id]) or return http404
    @section = @guide.guide_sections.where(title: nil).first || @guide.guide_sections.create
    @section.description_ids = (@section.description_ids += params[:description_ids].map(&:to_i)).uniq

    render jsonapi: @guide,
      fields: {
        guides: [
          :id
        ]
      }
  end

  def add_to_section
    @guide = current_user.guides.find_by_id(params[:id]) or return http404
    @section = @guide.guide_sections.find_by_id(params[:section_id]) or return http404
    @section.description_ids = (@section.description_ids += params[:description_ids].map(&:to_i)).uniq

    render jsonapi: @guide,
      fields: {
        guides: [
          :id
        ]
      }
  end

  def remove
    @guide = current_user.guides.find_by_id(params[:id]) or return http404
    @section = @guide.guide_sections.find_by_id(params[:section_id]) or return http404

    @guide_section_descriptions = GuideSectionDescription.where(guide_section_id: @section.id, description_id: params[:description_ids])
    @guide_section_descriptions.destroy_all

    render jsonapi: @guide,
      fields: {
        guides: [
          :id
        ]
      }

  end

end