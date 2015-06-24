require 'rails_helper'
require 'pusher'
require 'support/setup.rb'

feature 'Sending message' do
  before(:all) do
    setup_rooms
  end

  before(:each) do
    setup_login
  end

  scenario 'User sends a message' do
    fill_in 'Enter message', with: 'Hello world!'
    click_button 'Send'
    expect(page).to have_text('Hello world!')
  end

  scenario 'Server sends a message' do
    Pusher.url = ENV['PUSHER_URL']
    Pusher.trigger(
      @room1.channel, \
      'new_message', \
      '{"id": 12,' \
      '"body":"hello you!",' \
      '"created_at":"2015-06-04T10:35:42.778Z",' \
      '"user": "franek"}'
    )
    sleep 2
    screenshot_and_save_page
    expect(page).to have_content('hello you!')
    screenshot_and_save_page
  end

  scenario 'Server sends a message to different channel' do
    Pusher.url = ENV['PUSHER_URL']
    Pusher.trigger(
      @room2.channel, \
      'new_message', \
      '{"id": 13,' \
      '"body":"Where am I?",' \
      '"created_at":"2015-06-04T10:35:42.778Z",' \
      '"user": "franek"}'
    )
    sleep 2
    expect(page).to have_no_content('Where am I?!')
  end

  after(:all) do
    @room1.destroy
    @room2.destroy
    @room3.destroy
  end

  after(:each) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end

  protected

  def trigger(channel, event, data)
    Pusher.trigger(channel, event, data)
  end
end
