class ApiController < ApplicationController
  before_action :check_auth

  private

  def check_auth
    authorization = request.headers['Authorization']
    header = header.split(' ').last if authorization
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:id])
    rescue ActiveRecord::RecordNotFound => e
      raise ApiException.new(e.message, :unauthorized)
    rescue JWT::DecodeError => e
      raise ApiException.new(e.message, :unauthorized)
    end

    if DateTime.strptime(@decoded['exp'], "%m-%d-%Y %H:%M") < Time.now
      raise ApiException.new('Invalid Authorization token', :unauthorized)
    end
  end
end
