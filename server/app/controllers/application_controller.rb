class ApplicationController < ActionController::API
  rescue_from ApiException, with: :handle_exception

  private

  def handle_exception(error)
    render json: { error: error.message }, status: error.status
  end
end
