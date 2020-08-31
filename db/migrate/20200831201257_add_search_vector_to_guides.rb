class AddSearchVectorToGuides < ActiveRecord::Migration[6.0]
  def change
    add_column :guides, :search_vector, :tsvector
    add_index :guides, :search_vector, using: :gin
  end
end
