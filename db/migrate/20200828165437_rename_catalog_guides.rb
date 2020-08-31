class RenameCatalogGuides < ActiveRecord::Migration[6.0]
  def change
    rename_table :catalog_guides, :guides
    rename_column :audiences_catalog_guides, :catalog_guide_id, :guide_id
    rename_table :audiences_catalog_guides, :audiences_guides
  end
end
