require 'rails_helper'

describe User do
  let(:user) { FactoryGirl.create :user }

  it 'is valid with name' do
    expect(user).to be_valid
  end
  it 'is invalid without a firstname' do
    user.name = nil
    expect(user).to_not be_valid
  end
  it 'can add messages' do
    user.messages << Message.create(body: 'My message')
    expect(user.messages.size).to eq 1
  end
end
