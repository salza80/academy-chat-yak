require 'spec_helper'
describe ::ChatRoom do
  let(:chat_room) { create :chat_room }

  it 'has a valid factory' do
    expect(chat_room.name).to eq('Roomie')
  end

  it 'should require a name' do
    chat_room.name = ''
    chat_room.valid?
    expect(chat_room.errors[:name].size).to eq(1)
  end
end
