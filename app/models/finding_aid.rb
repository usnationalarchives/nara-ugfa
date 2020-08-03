class FindingAid < ApplicationRecord

  belongs_to :user

  validates_presence_of :title, :user

end