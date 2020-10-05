include ActionView::Helpers::DateHelper

class SerializableGuide < JSONAPI::Serializable::Resource
  type 'guides'

  attributes :id, :title, :background_color, :about, :purpose, :looking_for_collaborators, :complete_or_wip, :status, :nara_approved, :audience_ids, :uuid

  belongs_to :user

  has_many :guide_sections

  attribute :updated do
    @object.updated_at.strftime("%B %-d, %Y")
  end

  attribute :updatedAgo do
    time_ago_in_words(@object.updated_at)
  end

  attribute :author do
    {
      name: @object.user.name,
      role: @object.user.role
    }
  end

  attribute :audience_names do
    @object.audiences.map(&:name).join(", ")
  end
end
