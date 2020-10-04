class GuideSectionDescription < ApplicationRecord

  include CollectionPrioritizable

  belongs_to :guide_section, optional: true, touch: true
  belongs_to :description, optional: true

  has_many :blocks,
    lambda { order(weight: :asc)},
    as: :blockable,
    dependent: :destroy

  def prioritizable_collection
    guide_section.guide_section_descriptions
  end

end
