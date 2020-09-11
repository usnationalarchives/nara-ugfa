class UpdateBackgroundColorOnGuides < ActiveRecord::Migration[6.0]
  def change
    change_column :guides, :background_color, :string, null: false, default: "grey"
  end
end
