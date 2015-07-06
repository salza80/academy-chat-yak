class ChatRoom < ActiveRecord::Base
  has_many :messages, dependent: :destroy

  validates :name, presence: true

  default_scope { where (removed: false) }

  def channel
    'presence-room_' + id.to_s
  end
end
