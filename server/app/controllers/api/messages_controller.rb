class Api::MessagesController < ApplicationController
  def index
    messages = Message.filter_by_sender(params[:s]).filter_by_receiver(params[:r])
    render json: { messages: }
  end

  def create
    result = Message.create(**body)
    render json: { message: result }
  end

  def body
    params.require(:message).permit(:sender_id, :receiver_id, :text)
  end
end
