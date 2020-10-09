class GuideSection < ApplicationRecord

  include CollectionPrioritizable

  belongs_to :guide, optional: true, touch: true

  # default description order is descending weight, this is against the normal default
  # of CollectionPrioritizable so overrides for the moving methods are required on the
  # GuideSectionDescription model and expect newly added descriptions to show at the top
  # of sections
  has_many :guide_section_descriptions, lambda { order(weight: :desc) }, dependent: :destroy
  has_many :descriptions, through: :guide_section_descriptions

  # Only show un-resolved comments in the API
  has_many :comments, lambda { where(resolved: false)}, as: :commentable, dependent: :destroy

  # Method for getting all comments
  has_many :all_comments, class_name: "Comment", as: :commentable, dependent: :destroy

  has_many :blocks,
    lambda { order(weight: :asc)},
    as: :blockable,
    dependent: :destroy

  def prioritizable_collection
    guide.guide_sections
  end

  def sort_descriptions_by_naid
    weight = 2

    guide_section_descriptions.joins(:description).reorder("descriptions.naid DESC").each do |gsd|
      gsd.update_columns(weight: weight)
      weight += 2;
    end
  end

end
