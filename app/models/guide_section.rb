class GuideSection < ApplicationRecord

  include CollectionPrioritizable

  belongs_to :guide, optional: true, touch: true

  has_many :guide_section_descriptions, lambda { order(weight: :asc) }, dependent: :destroy
  has_many :descriptions, through: :guide_section_descriptions

  has_many :comments, lambda { where(resolved: false)}, as: :commentable, dependent: :destroy
  has_many :all_comments, class_name: "Comment", as: :commentable, dependent: :destroy

  def prioritizable_collection
    guide.guide_sections
  end

end
