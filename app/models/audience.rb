class Audience < ApplicationRecord

  validates_presence_of :name

  validates :name, {
    presence: true,
    uniqueness: true
  }

  has_and_belongs_to_many :guides

end
