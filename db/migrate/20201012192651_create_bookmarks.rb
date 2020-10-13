class CreateBookmarks < ActiveRecord::Migration[6.0]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false
      t.integer :guide_id, null: false

      t.timestamps null:false
    end
  end
end
