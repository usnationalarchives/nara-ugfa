class SerializableDescription < JSONAPI::Serializable::Resource
  type 'descriptions'

  attribute :id

  attribute :naId do
    @object.naid
  end

  attributes :level, :title

  attribute :scopeContent do
    @object.scope_content
  end

  attribute :data
end