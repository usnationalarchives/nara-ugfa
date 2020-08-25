json.status response.status
json.message response.message
json.results do
  json.total @all_descriptions.length
  json.pages  @descriptions.total_pages
  json.page (params[:page] || 1).to_i
  json.descriptions @descriptions do |description|
    json.id description.id
    json.title description.title
    json.data description.data
  end
end