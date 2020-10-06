include ActionView::Helpers::DateHelper

class SerializableComment < JSONAPI::Serializable::Resource
  type 'comments'

  attributes :id, :commentable_type, :commentable_id, :content

  attribute :user_name do
    @object.user.name
  end

  attribute :user_email do
    @object.user.email
  end

  attribute :gravatar do
    digest = Digest::MD5.hexdigest(@object.user.email)
    "https://secure.gravatar.com/avatar/#{digest}?d=retro&s=90"
  end

  attribute :created do
    (time_ago_in_words(@object.created_at) << " ago").titleize
  end
end
