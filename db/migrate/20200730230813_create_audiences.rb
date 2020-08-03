class CreateAudiences < ActiveRecord::Migration[6.0]
  def change
    create_table :audiences do |t|
      t.string :name, null: false
    end
  end
end
