class SerializableGuideSection < JSONAPI::Serializable::Resource
  type 'guide_sections'

  attributes :id, :title, :weight
end
