class CreateDescriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :descriptions do |t|
      t.integer :naid, null: false
      t.string :title, null: false
      t.string :level, null: false
      t.jsonb :data, null: false, default: '{}'
      t.jsonb :objects, null: false, default: '{}'
      t.tsvector :search_index
    end

    add_index :descriptions, :naid, unique: true
    add_index :descriptions, :search_index, using: :gin
  end
end
