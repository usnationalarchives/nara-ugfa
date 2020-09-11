class CreateGuideSections < ActiveRecord::Migration[6.0]
  def change
    create_table :guide_sections do |t|
      t.references :guide
      t.text :title
      t.integer :weight, null: false
      t.timestamps null: false
    end
  end
end
