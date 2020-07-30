class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :auth_token, null: false
      t.integer :catalog_id, null: false

      t.jsonb :catalog_attributes, null: false, default: '{}'
      t.timestamps null: false
    end
  end
end
