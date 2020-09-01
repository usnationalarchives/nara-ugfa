class SerializableUser < JSONAPI::Serializable::Resource
  type 'users'

  attributes :id, :name, :email, :catalog_attributes, :role

  attribute :gravatar do
    digest = Digest::MD5.hexdigest(@object.email)
    "https://secure.gravatar.com/avatar/#{digest}?d=retro&s=90"
  end

  has_many :guides
end