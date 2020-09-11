class GuideSection < ApplicationRecord

  include CollectionPrioritizable

  belongs_to :guide

  def prioritizable_collection
    guide.guide_sections
  end

end
