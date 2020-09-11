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

  has_many :guide_sections, lambda { order(weight: :asc) }
  accepts_nested_attributes_for :guide_sections, allow_destroy: true

  validates_presence_of :user

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
    dark_grey: "Dark Grey",
    dark_blue: "Dark Blue",
    teal: "Teal",
    green: "Green",
    violet: "Violet",
    magenta: "Magenta",
    red: "Red",
    light_blue: "Light Blue",
    yellow: "Yellow",
  }

  def nara_approved
    user.role == "NARA Staff"
  end

end
