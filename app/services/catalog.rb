class Catalog

  attr_accessor :errors

  def initialize
    @base_url = ENV.fetch("NARA_CATALOG_API_URL")
    @errors = []
  end

  def get_all(options)
    results = [];
    cursor_mark = "*"

    while cursor_mark do 
      options["cursor_mark"] = cursor_mark
      response = get(options)
      results += response["opaResponse"]["results"]["result"]
      cursor_mark = response["opaResponse"]["results"]["nextCursorMark"]
    end 

    return results
  end

  def get(options = {})
    response = Faraday.get(@base_url) do |req|
      req.params["rows"] = 100
      req.params["cursorMark"] = options["cursor_mark"] || "*"

      options[:params].each do |key, value|
        req.params[key] = value
      end
    end

    parsed_response = JSON.parse(response.body)

    return parsed_response
  end

end