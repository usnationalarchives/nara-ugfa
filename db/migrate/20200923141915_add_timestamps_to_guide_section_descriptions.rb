class AddTimestampsToGuideSectionDescriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :guide_section_descriptions, :created_at, :datetime, null: false
    add_column :guide_section_descriptions, :updated_at, :datetime, null: false
  end
end
