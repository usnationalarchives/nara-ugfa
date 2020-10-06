class AddBackgroundImageToGuides < ActiveRecord::Migration[6.0]
  def change
    add_column :guides, :background_image, :text
  end
end
