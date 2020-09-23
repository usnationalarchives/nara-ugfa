class GuideSection < ApplicationRecord

  include CollectionPrioritizable

  belongs_to :guide, optional: true, touch: true

  has_many :guide_section_descriptions, lambda { order(weight: :asc) }, dependent: :destroy
  has_many :descriptions, through: :guide_section_descriptions

  def prioritizable_collection
    guide.guide_sections
  end

end
