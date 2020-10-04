
class SerializableGuideSectionDescription < JSONAPI::Serializable::Resource
  type 'guide_section_descriptions'

  attributes :id, :guide_section_id, :description_id

  belongs_to :description
  has_many :blocks
end
