class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :commentable, polymorphic: true, null: false
      t.references :user, null: false
      t.boolean :resolved, null: false, default: false
      t.text :content

      t.timestamps null: false
    end
  end
end
