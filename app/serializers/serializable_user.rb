class SerializableUser < JSONAPI::Serializable::Resource
  type 'users'

  attributes :id, :name, :email, :catalog_attributes
end