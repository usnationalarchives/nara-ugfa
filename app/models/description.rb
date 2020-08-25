class Description < ApplicationRecord

  include FulltextSearchable

  has_fulltext_search plan: {
    A: [:title],
    B: [:scope_content]
  }

  def scope_content
    data.try(:[], "scopeAndContentNote")
  end

end