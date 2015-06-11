class ChatRoom < ActiveRecord::Base
  has_many :messages

  validates :channel_id, :name, presence: true
end
