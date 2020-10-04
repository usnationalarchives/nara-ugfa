class API::V1::BlocksController < API::V1::BaseController

  before_action :set_block, except: [:create]

  # TODO: authorize the action on blockable resource
  before_action :set_blockable, except: [:destroy]

  def create
    @block = Block.create(block_params)

    render jsonapi: @block,
      fields: {
        blocks: [:id, :blockable_type, :blockable_id, :block_type, :data, :weight],
      }
  end

  def update
    if @block.update(block_params)
      render jsonapi: @block,
        fields: {
          blocks: [:id, :blockable_type, :blockable_id, :block_type, :data, :weight],
        }
    end
  end

  def destroy
    @block.destroy
    render json: { message: "Block Destroyed" }
  end

  def move_up
  end

  def move_down
  end

  private

  def block_params
    params.require(:block).permit(
      :blockable_type,
      :blockable_id,
      :block_type,
      data: {}
    )
  end

  def set_blockable
    begin
      @blockable = params[:block][:blockable_type].constantize.find_by_id(params[:block][:blockable_id]) or return http404
    rescue
      return http404
    end
  end

  def set_block
    @block = Block.find_by_id(params[:id]) or return http404
  end

end
