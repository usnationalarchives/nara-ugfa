json.status response.status
json.message response.message
json.results do
  json.total @all_descriptions.length
  json.pages @descriptions.total_pages
  json.page @page
  json.rows @rows
  json.descriptions @descriptions do |description|
    json.id description.id
    json.naId description.naid
    json.title description.title
    json.scopeContent description.scope_content
    json.level description.level
    json.data description.data
  end
end