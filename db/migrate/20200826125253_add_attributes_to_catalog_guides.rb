class AddAttributesToCatalogGuides < ActiveRecord::Migration[6.0]
  def change
    add_column :catalog_guides, :looking_for_collaborators, :string, null: false, default: "no"
    add_column :catalog_guides, :complete_or_wip, :string, null: false, default: "wip"

    create_table :audiences_catalog_guides do |t|
      t.references :audience, null: false
      t.references :catalog_guide, null: false
    end
  end
end
