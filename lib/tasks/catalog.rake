namespace :catalog do
  
  task :seed => :environment do
    client = Catalog.new

    # Lists

    # American West
    results = client.get_all(params: {
      "description.item.variantControlNumberArray.variantControlNumber.number": "AMWEST"
    })
  end

end