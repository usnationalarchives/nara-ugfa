class CatalogDataMap

  def self.naid(record)
    record["naId"]
  end

  def self.title(record)
    record["description"][self.level(record)]["title"]
  end

  def self.level(record)
    if record["description"]["item"]
      return "item"
    end

    if record["description"]["itemAv"]
      return "itemAv"
    end

    if record["description"]["fileUnit"]
      return "fileUnit"
    end

    if record["description"]["recordGroup"]
      return "recordGroup"
    end

    if record["description"]["series"]
      return "series"
    end

    if record["description"]["collection"]
      return "collection"
    end

    return "na"
  end

  def self.data(record)
    record["description"][self.level(record)]
  end

  def self.objects(record)
    if !record["objects"]
      return []
    end

    objects = record["objects"]["object"]

    if objects.class.name === "Array"
      data = objects.map{|object| map_object(object)}
    elsif objects
      data = [self.map_object(objects)]
    end

    data
  end

  private

  def self.map_object(object)
    json = {
      type: object.try(:[], "technicalMetadata").try(:[], "mime"),
      thumbnail: {
        url: object.try(:[], "thumbnail").try(:[], "@url")
      },
      files: self.map_files(object["file"])
    }

    if object["imageTiles"]
      json["imageTiles"] = {
        url: object.try(:[], "imageTiles").try(:[], "@url")
      }
    end

    json
  end

  def self.map_files(file)
    if file.class.name == "Array"
      return file.map{ |file| 
        {
          url: file["@url"],
          path: file["@path"]
        }
      }
    else
      return [{
        url: file["@url"],
        path: file["@path"]
      }]
    end
  end
end