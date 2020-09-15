class GuideSection < ApplicationRecord

  include CollectionPrioritizable

  belongs_to :guide, optional: true

  has_many :guide_section_descriptions, dependent: :destroy
  has_many :descriptions, through: :guide_section_descriptions

  def prioritizable_collection
    guide.guide_sections
  end

end
