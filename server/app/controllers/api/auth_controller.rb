class Api::AuthController < ApplicationController
  def login
    user = User.find_by(name: body[:name])
    raise ApiException.new("User doesn't exist", :not_found) if user.blank?

    render json: { user: }
  end

  def body
    params.require(:user).permit(:name)
  end
end
