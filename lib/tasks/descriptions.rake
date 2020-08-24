namespace :descriptions do
  
  task :seed => :environment do
    client = Catalog.new

    queries = [
      {
        "type": "description",
        "description.item.variantControlNumberArray.variantControlNumber.number": "AMWEST"
      },
      {
        "type": "description",
        "description.item.variantControlNumberArray.variantControlNumber.number": "AFRICAN ART"
      },
      {
        "type": "description",
        "description.item.variantControlNumberArray.variantControlNumber.number": "INDIANS"
      },
      {
        "type": "description",
        "description.item.variantControlNumberArray.variantControlNumber.number": "CW #"
      },
      {
        "type": "description",
        "description.item.variantControlNumberArray.variantControlNumber.number": "REVWAR"
      },
      {
        "type": "description",
        "description.collection.collectionIdentifier": "GWB"
      },
      {
        "type": "description",
        "description.series.dataControlGroup.groupCd": "LPGWB"
      },
      {
        "type": "description",
        "description.fileUnit.dataControlGroup.groupCd": "LPGWB"
      },
      {
        "type": "description",
        "description.item.dataControlGroup.groupCd": "LPGWB"
      },
      {
        "type": "description",
        "description.itemAv.dataControlGroup.groupCd": "LPGWB"
      },
    ]

    queries.each do |query|
      results = client.get_all(params: query) 

      results.each do |result|
        puts "RECORD: ************************"
        puts result
        puts "********************************"

        description = Description.find_or_initialize_by(
          naid: DataMap.naid(result)
        )

        description.attributes = {
          naid: DataMap.naid(result),
          title: DataMap.title(result),
          level: DataMap.level(result),
          data: DataMap.data(result),
          objects: DataMap.objects(result)
        }

        description.save
      end
    end
  end
end