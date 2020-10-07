namespace :descriptions do

  task :seed => :environment do
    client = Catalog.new

    queries = [
      # {
      #   "type": "description",
      #   "publicContributions.tags": "SIL!bp"
      # },
      {
        "type": "description",
        "publicContributions.tags": "lax_2017"
      },
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
          naid: CatalogDataMap.naid(result)
        )

        description.attributes = {
          naid: CatalogDataMap.naid(result),
          title: CatalogDataMap.title(result),
          level: CatalogDataMap.level(result),
          data: CatalogDataMap.data(result),
          objects: CatalogDataMap.objects(result)
        }

        description.save
      end
    end
  end
end
