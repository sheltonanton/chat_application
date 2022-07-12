class ApiController < ApplicationController
  before_action :check_auth

  private

  def check_auth
    header = request.headers['Authorization']
    header = header.split(' ').last if header.present?
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:id])
    rescue ActiveRecord::RecordNotFound => e
      raise ApiException.new(e.message, :unauthorized)
    rescue JWT::DecodeError => e
      raise ApiException.new(e.message, :unauthorized)
    end

    if @decoded["exp"] < Time.now.to_i
      raise ApiException.new('Invalid Authorization token', :unauthorized)
    end
  end
end
