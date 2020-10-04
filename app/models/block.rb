class Block < ApplicationRecord

  include CollectionPrioritizable
  include ModalAttributable

  belongs_to :blockable, polymorphic: true

  def prioritizable_collection
    blockable.blocks
  end

  modal_attribute :block_type, {
    summary: "Summary",
    research_highlight: "Research Highlight"
  }

end
