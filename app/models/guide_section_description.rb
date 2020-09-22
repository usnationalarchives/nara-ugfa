class GuideSectionDescription < ApplicationRecord

  belongs_to :guide_section, optional: true, touch: true
  belongs_to :description, optional: true

end
