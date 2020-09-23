class SerializableDescription < JSONAPI::Serializable::Resource
  type 'descriptions'

  attribute :id

  attribute :naId do
    @object.naid
  end

  attributes :level, :title

  attribute :scopeContent do
    @object.scope_content
  end

  attributes :data, :objects, :ancestors

  attribute :thumbnailUrl do
    @object.objects.first.try(:[], "thumbnail").try(:[], "url")
  end

  attribute :creators do
    if @object.data.try(:[], "parentSeries").try(:[], "creatingOrganizationArray").try(:class).try(:name) == "Array"
      @object.data["parentSeries"]["creatingOrganizationArray"].map{ |o| o.try(:[], "creatingOrganization").try(:[], "creator").try(:[], "termName")}.join(", ")
    else
      @object.data.try(:[], "parentSeries").try(:[], "creatingOrganizationArray").try(:[], "creatingOrganization").try(:[], "creator").try(:[], "termName")
    end
  end

  attribute :ancestors do
    items = []
    data = @object.data

    case @object.level
    when 'item', 'itemAv'
      if data.try(:[], "parentFileUnit")
        if data.try(:[], "parentFileUnit").try(:[], "parentSeries").try(:[], "parentRecordGroup")
          items << {
            level: "Record Group",
            title: data.try(:[], "parentFileUnit").try(:[], "parentSeries").try(:[], "parentRecordGroup")["title"],
            naId: data.try(:[], "parentFileUnit").try(:[], "parentSeries").try(:[], "parentRecordGroup")["naId"],
          }
        elsif data.try(:[], "parentSeries").try(:[], "parentCollection")
          items << {
            level: "Collection",
            title: data.try(:[], "parentFileUnit").try(:[], "parentSeries").try(:[], "parentCollection")["title"],
            naId: data.try(:[], "parentFileUnit").try(:[], "parentSeries").try(:[], "parentCollection")["naId"],
          }
        end

        items << {
          level: "Series",
          title: data.try(:[], "parentFileUnit").try(:[], "parentSeries")["title"],
          naId: data.try(:[], "parentFileUnit").try(:[], "parentSeries")["naId"],
        }

        items << {
          level: "File Unit",
          title: data.try(:[], "parentFileUnit")["title"],
          naId: data.try(:[], "parentFileUnit")["naId"],
        }
      elsif data.try(:[], "parentSeries")
        if data.try(:[], "parentSeries").try(:[], "parentRecordGroup")
          items << {
            level: "Record Group",
            title: data.try(:[], "parentSeries").try(:[], "parentRecordGroup")["title"],
            naId: data.try(:[], "parentSeries").try(:[], "parentRecordGroup")["naId"],
          }
        elsif data.try(:[], "parentSeries").try(:[], "parentCollection")
          items << {
            level: "Collection",
            title: data.try(:[], "parentSeries").try(:[], "parentCollection")["title"],
            naId: data.try(:[], "parentSeries").try(:[], "parentCollection")["naId"],
          }
        end

        items << {
          level: "Series",
          title: data.try(:[], "parentSeries")["title"],
          naId: data.try(:[], "parentSeries")["naId"],
        }
      end
    when 'series'
      if data.try(:[], "parentRecordGroup")
        items << {
          level: "Record Group",
          title: data.try(:[], "parentRecordGroup")["title"],
          naId: data.try(:[], "parentRecordGroup")["naId"],
        }
      elsif data.try(:[], "parentCollection")
        items << {
          level: "Collection",
          title: data.try(:[], "parentCollection")["title"],
          naId: data.try(:[], "parentCollection")["naId"],
        }
      end
    when 'fileUnit'
      if data.try(:[], "parentSeries").try(:[], "parentRecordGroup")
        items << {
          level: "Record Group",
          title: data.try(:[], "parentSeries").try(:[], "parentRecordGroup")["title"],
          naId: data.try(:[], "parentSeries").try(:[], "parentRecordGroup")["naId"],
        }
      elsif data.try(:[], "parentSeries").try(:[], "parentCollection")
        items << {
          level: "Collection",
          title: data.try(:[], "parentSeries").try(:[], "parentCollection")["title"],
          naId: data.try(:[], "parentSeries").try(:[], "parentCollection")["naId"],
        }
      end

      items << {
        level: "Series",
        title: data.try(:[], "parentSeries")["title"],
        naId: data.try(:[], "parentSeries")["naId"],
      }
    end

    items
  end
end