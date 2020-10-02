class CreateBlocks < ActiveRecord::Migration[6.0]
  def change
    create_table :blocks do |t|
      t.references :blockable, polymorphic: true, null: false
      t.integer :weight, null: false, index: true
      t.jsonb :data, null: false, default: "{}"
      t.string :block_type, null: false, default: "summary"

      t.timestamps null: false
    end
  end
end
