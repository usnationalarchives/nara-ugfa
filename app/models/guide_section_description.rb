class GuideSectionDescription < ApplicationRecord

  belongs_to :guide_section, optional: true
  belongs_to :description, optional: true

end
