class CreateGuideSectionDescriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :guide_section_descriptions do |t|
      t.references :guide_section, null: false
      t.references :description, null: false
    end
  end
end
