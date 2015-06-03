require 'rails_helper'

describe User do
  it 'is valid with name' do
    user = FactoryGirl.create(:user)
    expect(user).to be_valid
  end
  it 'is invalid without a firstname' do
    user = FactoryGirl.build(:user, name: nil)
    expect(user).to_not be_valid
  end
  it 'can add messages' do
    user = FactoryGirl.create(:user)
    user.messages << Message.create(body: 'My message')
    expect(user.messages.size).to eq 1
  end
end
