class SerializableBookmark < JSONAPI::Serializable::Resource
  type 'bookmarks'

  attributes :id, :guide_id, :user_id

  belongs_to :guide
  belongs_to :user
end
