class CatalogGuide < ApplicationRecord

  belongs_to :user

  validates_presence_of :title, :user

end