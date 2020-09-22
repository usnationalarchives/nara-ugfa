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

  attributes :data, :objects

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
end