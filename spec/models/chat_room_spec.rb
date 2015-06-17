require 'spec_helper'
describe ::ChatRoom do
  let(:chat_room) { FactoryGirl.create :chat_room }

  it 'has a valid factory' do
    expect(chat_room.name).to eq('chatroom1')
  end

  it 'should require a name' do
    chat_room.name = ''
    chat_room.valid?
    expect(chat_room.errors[:name].size).to eq(1)
  end
end
