class AddWeightToGuideSectionDescriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :guide_section_descriptions, :weight, :integer, null: false, index: true
    add_index :guide_sections, :weight
  end
end
