class GuideSectionDescription < ApplicationRecord

  include CollectionPrioritizable

  belongs_to :guide_section, optional: true, touch: true
  belongs_to :description, optional: true
  has_one :guide, through: :guide_section
  has_one :user, through: :guide

  has_many :comments, lambda { where(resolved: false)}, as: :commentable, dependent: :destroy
  has_many :all_comments, class_name: "Comment", as: :commentable, dependent: :destroy

  has_many :blocks,
    lambda { order(weight: :asc)},
    as: :blockable,
    dependent: :destroy

  def prioritizable_collection
    guide_section.guide_section_descriptions
  end

  def to_json
    {
      description_id: description_id,
      guide_title: guide.title,
      guide_id: guide.id,
      status: guide.status_string,
      updated: updated_at.strftime("%B %-d, %Y")
    }
  end

  ####################################################################################
  # Descriptions are ordered by descending weight so we have to override these methods
  # defined in CollectionPrioritizable
  def move_up_in_collection!
    weight = self.weight

    if previous_item = self.prioritizable_collection.where(['weight > ?', weight]).last
      swap_weight_with_other_item!(previous_item)
    end
  end

  def move_down_in_collection!
    weight = self.weight

    if next_item = self.prioritizable_collection.where(['weight < ?', weight]).first
      swap_weight_with_other_item!(next_item)
    end
  end
  ####################################################################################

end
