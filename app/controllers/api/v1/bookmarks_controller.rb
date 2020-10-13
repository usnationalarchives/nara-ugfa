class API::V1::BookmarksController < API::V1::BaseController

  def create
    @bookmark = current_user.bookmarks.create(bookmark_params)

    render jsonapi: @bookmark,
      fields: {
        bookmarks: [:id, :guide_id, :user_id],
      }
  end

  def destroy
    if @bookmark = current_user.bookmarks.find_by_guide_id(params[:guide_id])
      @bookmark.destroy

      render json: { message: "Bookmark Destroyed" }
    end
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(
      :guide_id
    )
  end

end
