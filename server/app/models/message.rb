class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  scope :filter_by_sender, -> (sender_id) { where(sender_id:) if sender_id.present? }
  scope :filter_by_receiver, -> (receiver_id) { where(receiver_id:) if receiver_id.present? }
end
