class Block < ApplicationRecord

  include CollectionPrioritizable
  include ModalAttributable

  after_save :build_data

  belongs_to :blockable, polymorphic: true

  has_many :comments, lambda { where(resolved: false)}, as: :commentable, dependent: :destroy
  has_many :all_comments, class_name: "Comment", as: :commentable, dependent: :destroy

  def prioritizable_collection
    blockable.blocks
  end

  modal_attribute :block_type, {
    summary: "Summary",
    research_highlight: "Research Highlight"
  }

  private

  def build_data
    if block_type == "research_highlight" && data["background_image"].present?
      naid = data["background_image"].split("/").last.gsub("/", "").to_i
      desc = Description.find_by_naid(naid)
      image_url = desc.objects.first.try(:[], "files").try(:first).try(:[], "url")
      new_data = data
      new_data["background_image_url"] = image_url
      self.update_columns(data: new_data)
    end
  end
end
