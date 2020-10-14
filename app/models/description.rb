class Description < ApplicationRecord

  include FulltextSearchable

  before_save :set_parent_naid

  has_fulltext_search plan: {
    A: [:title],
    B: [:scope_content]
  }

  has_many :guide_section_descriptions

  def scope_content
    data.try(:[], "scopeAndContentNote")
  end

  def set_parent_naid
    self.parent_naid ||= nil

    case level
    when 'item', 'itemAv'
      if data.try(:[], "parentFileUnit")
        self.parent_naid = data.try(:[], "parentFileUnit")["naId"]
      else
        self.parent_naid = data.try(:[], "parentSeries")["naId"]
      end
    when 'series'
      if data.try(:[], "parentRecordGroup")
        self.parent_naid = data.try(:[], "parentRecordGroup")["naId"]
      elsif data.try(:[], "parentCollection")
        self.parent_naid = data.try(:[], "parentCollection")["naId"]
      end
    when 'fileUnit'
      self.parent_naid = data.try(:[], "parentSeries")["naId"]
    end
  end

end
