class API::V1::DescriptionsController < API::V1::BaseController

  def index
    if params[:q]
      @all_descriptions = Description.fulltext_search(params[:q].to_s).by_relevance
    else
      @all_descriptions = Description.all
    end

    @descriptions = @all_descriptions.page(params[:page]).per(params[:rows].try(:to_i) || 20)
  end

end