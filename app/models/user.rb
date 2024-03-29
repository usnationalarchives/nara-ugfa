class User < ApplicationRecord

  include ModalAttributable

  before_create :initialize_auth_token!

  validates_presence_of :name, :email, :catalog_id

  has_many :guides
  has_many :guide_sections, through: :guides
  has_many :guide_section_descriptions, through: :guide_sections
  has_many :comments, dependent: :destroy
  has_many :bookmarks
  has_many :bookmarked_guides, through: :bookmarks, source: :guide

  def to_json
    {
      "id": id,
      "name": name,
      "email": email,
      "catalog_attributes": catalog_attributes,
      "admin": admin,
      "gravatar": gravatar
    }.to_json
  end

  def role
    catalog_attributes.try(:[], "isNaraStaff") ? "NARA Staff" : "Citizen Archivist"
  end

  def gravatar
    digest = Digest::MD5.hexdigest(email)
    "https://secure.gravatar.com/avatar/#{digest}?d=retro&s=90"
  end

  private

  def initialize_auth_token!
    self.auth_token ||= SecureRandom.base64(32).delete('+/=')[0..31]
  end

end
