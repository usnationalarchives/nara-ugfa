class API::V1::GuideSectionsController < API::V1::BaseController

  before_action :set_guide_and_section, only: [:update, :destroy, :move_up, :move_down]

  def create
    @guide = current_user.guides.find_by_id(params[:id]) or return http404
    @section = @guide.guide_sections.create()

    render jsonapi: @section,
      fields: {
        guide_sections: [:title, :weight]
      }
  end

  def update
    if @section.update(guide_section_params)
      render jsonapi: @section,
        include: [:descriptions],
        fields: {
          guide_sections: [:id, :title, :weight, :descriptions]
        }
    end
  end

  def move_up
    if @section.move_up_in_collection!
      render jsonapi: @section,
        fields: {
          guide_sections: [:title, :weight]
        }
    end
  end

  def move_down
    if @section.move_down_in_collection!
      render jsonapi: @section,
        fields: {
          guide_sections: [:title, :weight]
        }
    end
  end

  def destroy
    if @section.destroy
      render jsonapi: @guide,
        fields: {
          guide: [:title]
        }
    end
  end

  private

  def set_guide_and_section
    @guide = current_user.guides.find_by_id(params[:id]) or return http404
    @section = @guide.guide_sections.find_by_id(params[:section_id]) or return http404
  end

  def guide_section_params
    params.require(:guide_section).permit(
      :title,
    )
  end

end
