class Guide < ApplicationRecord

  include Publishable
  include ModalAttributable
  include FulltextSearchable
  include UniquelyIdentifiable

  has_fulltext_search plan: {
    A: [:title],
    B: [:about, :purpose]
  }

  belongs_to :user

  has_and_belongs_to_many :audiences

  has_many :guide_sections, lambda { order(weight: :asc) }, dependent: :destroy
  has_many :descriptions, through: :guide_sections
  accepts_nested_attributes_for :guide_sections, allow_destroy: true

  validates_presence_of :user
  
  scope :pending_moderation, lambda {
    where(status: "published").
    where('updated_at > ?', 24.hours.ago)
  }

  scope :catalog_ready, lambda {
    where(status: "published").
    where('updated_at < ?', 24.hours.ago)
  }

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
    if user.role == "NARA Staff"
      return true
    elsif (status == "published") && (updated_at < 1.day.ago)
      return true
    else
      return false
    end
  end

  def pending
    if (status == "published") && (updated_at > 1.day.ago)
      return true
    else
      return false
    end
  end

end
