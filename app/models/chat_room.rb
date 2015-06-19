class ChatRoom < ActiveRecord::Base
  has_many :messages

  validates :name, presence: true

  def channel
    'room_' + id.to_s
  end
end
