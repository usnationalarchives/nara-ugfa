class API::V1::GuideSectionDescriptionsController < API::V1::BaseController

  before_action :set_guide_and_section, only: [:add_to_section, :remove, :move, :move_up, :move_down]

  def add
    @guide = current_user.guides.find_by_id(params[:id]) or return http404
    @section = @guide.guide_sections.where(title: nil).first || @guide.guide_sections.create
    @section.description_ids = (@section.description_ids += params[:description_ids].map(&:to_i)).uniq

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

  def add_to_section
    if params[:after]
      @after_section_description = @section.guide_section_descriptions.find_by_description_id(params[:after]) or return http404

      # offset weight of following descriptions in the section
      @following_section_descriptions = @section.guide_section_descriptions.where('weight > ?', @after_section_description.weight);
      @following_section_descriptions.each do |gsd|
        new_weight = (params[:description_ids].length * 2) + gsd.weight + 2
        gsd.update_columns(weight: new_weight);
      end

      params[:description_ids].each_with_index do |id, index|
        GuideSectionDescription.create(
          guide_section_id: @section.id,
          description_id: id,
          weight: @after_section_description.weight + 2 + index
        )
      end
    else
      @section.description_ids = (@section.description_ids += params[:description_ids].map(&:to_i)).uniq
    end

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


  def remove
    @guide_section_descriptions = GuideSectionDescription.where(guide_section_id: @section.id, description_id: params[:description_ids])
    @guide_section_descriptions.destroy_all

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

  def move
    @guide_section_description = @section.guide_section_descriptions.find_by_description_id(params[:description_id]) or return http404
    @target_section = GuideSection.find_by_id(params[:target_section_id]) or return http404

    if @guide_section_description.update(guide_section_id: @target_section.id)
      render jsonapi: @guide,
        fields: {
          guides: [:id, :updatedAgo]
        }
    end
  end

  def move_up
    @guide_section_description = @section.guide_section_descriptions.find_by_description_id(params[:description_id]) or return http404

    if @guide_section_description.move_up_in_collection!
      render jsonapi: @guide,
        fields: {
          guides: [:id, :updatedAgo]
        }
    end
  end

  def move_down
    @guide_section_description = @section.guide_section_descriptions.find_by_description_id(params[:description_id]) or return http404

    if @guide_section_description.move_down_in_collection!
      render jsonapi: @guide,
        fields: {
          guides: [:id, :updatedAgo]
        }
    end
  end

  private

  def set_guide_and_section
    @guide = current_user.guides.find_by_id(params[:id]) or return http404
    @section = @guide.guide_sections.find_by_id(params[:section_id]) or return http404

    puts "****************************"
    puts "section id: #{@section.id}"
    puts "guide id: #{@guide.id}"
    puts "****************************"

  end

end
