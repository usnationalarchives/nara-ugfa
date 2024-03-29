include ActionView::Helpers::DateHelper

class SerializableGuideSection < JSONAPI::Serializable::Resource
  type 'guide_sections'

  attributes :id, :title, :weight

  attribute :updatedAgo do
    time_ago_in_words(@object.updated_at)
  end

  has_many :blocks
  has_many :descriptions
  has_many :guide_section_descriptions
  has_many :comments
end
