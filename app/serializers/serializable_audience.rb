class SerializableAudience < JSONAPI::Serializable::Resource
  type 'audiences'

  attribute :name

end
