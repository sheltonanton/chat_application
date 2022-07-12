class Api::AuthController < ApiController
  skip_before_action :check_auth, only: [:login]

  def login
    name = login_params[:name]
    user = User.find_by(name: )
    raise ApiException.new('User not found', :unauthorized) if user.nil?

    token = JsonWebToken.encode(id: user.id)
    time = Time.now + 24.hours.to_i
    render json: {
      token:,
      exp: time.strftime("%m-%d-%Y %H:%M"),
      user_id: user.id
    }
  end

  def login_params
    params.require(:user).permit(:name)
  end
end
