class AddStatusToGuides < ActiveRecord::Migration[6.0]
  def change
    add_column :guides, :status, :string, null: false, default: "draft"
  end
end
