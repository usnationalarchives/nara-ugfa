class RenameFindingAids < ActiveRecord::Migration[6.0]
  def change
    rename_table :finding_aids, :catalog_guides
  end
end
