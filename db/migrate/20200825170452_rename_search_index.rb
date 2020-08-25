class RenameSearchIndex < ActiveRecord::Migration[6.0]
  def change
    rename_column :descriptions, :search_index, :search_vector
  end
end
