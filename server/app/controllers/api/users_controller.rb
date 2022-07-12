class Api::UsersController < ApiController
  def create
    raise ApiException.new('User already exists', :conflict) if User.exists?(name: params[:name])

    user = User.create(name: body[:name])
    render json: {user: }
  end

  def body
    params.require(:user).permit(:name, :id)
  end
end
