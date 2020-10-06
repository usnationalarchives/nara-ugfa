class API::V1::CommentsController < API::V1::BaseController

  # TODO: authorize the action on commentable resource
  before_action :set_commentable, only: [:create]

  def create
    @comment = current_user.comments.create(comment_params)

    render jsonapi: @comment,
      fields: {
        comments: [:id, :commentable_type, :commentable_id, :gravatar, :content, :created, :user_name],
      }
  end

  def resolve
    # TODO: authorize access to commenttable resource
    @commentable = params[:commentable_type].constantize.find_by_id(params[:commentable_id]) or return http404

    @comments = Comment.where(id: params[:comment_ids])
    @comments.update_all(resolved: true)

    render json: { message: "Comments Resolved" }
  end

  private

  def comment_params
    params.require(:comment).permit(
      :commentable_type,
      :commentable_id,
      :content
    )
  end

  def set_commentable
    begin
      @commentable = params[:comment][:commentable_type].constantize.find_by_id(params[:comment][:commentable_id]) or return http404
    rescue
      return http404
    end
  end

end
