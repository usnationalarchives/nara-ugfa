class SerializableBlock < JSONAPI::Serializable::Resource
  type 'blocks'

  attributes :id, :blockable_type, :blockable_id, :block_type, :weight, :data

end
