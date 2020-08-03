class User < ApplicationRecord

  before_create :initialize_auth_token!

  validates_presence_of :name, :email, :catalog_id

  def to_json
    {
      "id": id,
      "name": name,
      "email": email,
      "catalog_attributes": catalog_attributes,
    }.to_json
  end

  private

  def initialize_auth_token!
    self.auth_token ||= SecureRandom.base64(32).delete('+/=')[0..31]
  end


end