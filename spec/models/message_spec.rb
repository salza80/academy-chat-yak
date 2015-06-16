require 'spec_helper'
describe ::Message do
  let(:message) { FactoryGirl.create :message }

  it 'has a valid factory' do
    expect(message.body).to eq('Hi!')
  end

  it 'should require a body' do
    message.body = ''
    message.valid?
    expect(message.errors[:body].size).to eq(1)
  end
end
