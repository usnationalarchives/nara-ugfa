class RemoveNotNullConstraintFromGuidesTitle < ActiveRecord::Migration[6.0]
  def up
    change_column :guides, :title, :string, null: true
  end

  def down
    change_column :guides, :title, :string, null: false
  end
end
