class AddUuidToGuides < ActiveRecord::Migration[6.0]
  def change
    add_column :guides, :uuid, :uuid, index: true

    Guide.reset_column_information

    Guide.all.each do |guide|
      guide.save(validate:false)
    end

    change_column_null :guides, :uuid, false
  end
end
