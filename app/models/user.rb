class User < ApplicationRecord

  before_create :initialize_auth_token!

  validates_presence_of :name, :email, :catalog_id

  private

  def initialize_auth_token!
    self.auth_token ||= SecureRandom.base64(32).delete('+/=')[0..31]
  end

end