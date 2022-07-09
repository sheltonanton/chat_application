class ApiException < StandardError
  attr_reader :message, :status

  def initialize(message='Server Error', status= 400)
    @message = message
    @status = status

    super(message)
  end
end