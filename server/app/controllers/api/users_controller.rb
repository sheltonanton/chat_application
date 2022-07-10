class Api::UsersController < ApplicationController
  def create
    raise ApiException.new('User already exists', :conflict) if User.exists?(name: params[:name])

    user = User.create(name: body[:name])
    render json: {user: }
  end

  def body
    params.require(:user).permit(:name, :id)
  end
end
