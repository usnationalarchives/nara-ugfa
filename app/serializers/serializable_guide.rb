class SerializableGuide < JSONAPI::Serializable::Resource
  type 'guides'

  attributes :id, :title, :background_color, :about, :purpose, :looking_for_collaborators, :complete_or_wip
end