class AddParentNaidToDescriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :descriptions, :parent_naid, :integer, index: true

    Description.reset_column_information

    # Active Record before_save callback will assign
    # the parent_naid attribute based on the existing
    # catalog data
    Description.all.each do |d|
      d.save
    end
  end
end
