class CreateFindingAids < ActiveRecord::Migration[6.0]
  def change
    create_table :finding_aids do |t|
      t.string :title, null: false
      t.string :background_color
      t.text :about
      t.text :purpose

      t.references :user, null: false

      t.timestamps null: false
    end
  end
end
