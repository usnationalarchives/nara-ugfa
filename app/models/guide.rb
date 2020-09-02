class Guide < ApplicationRecord

  include Publishable
  include ModalAttributable
  include FulltextSearchable

  has_fulltext_search plan: {
    A: [:title],
    B: [:about, :purpose]
  }

  belongs_to :user

  has_and_belongs_to_many :audiences

  validates_presence_of :title, :user

  modal_attribute :looking_for_collaborators, {
    no: "No",
    yes: "Yes"
  }

  modal_attribute :complete_or_wip, {
    wip: "Work in Progress",
    complete: "Complete"
  }

  modal_attribute :background_color, {
    grey: "Grey",
    yellow: "Yellow",
    blue: "Blue",
  }

  def nara_approved
    user.role == "NARA Staff"
  end

end
