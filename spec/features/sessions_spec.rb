require 'rails_helper'
require 'pusher'

feature 'Sending message' do
  before(:each) do
    setup_rooms
    setup_environment
    login
  end

  scenario 'User Logs Out' do
    click_link 'Log out'
    expect(page).to have_text('You have to be logged in to chat!')
  end

  # scenario 'User sends a message' do
  #   fill_in 'Enter message', with: 'Hello world!'
  #   click_button 'Send'
  #   expect(page).to have_text('Hello world!')
  # end

  # scenario 'Server sends a message' do
  #   find('.room-list-item', text: 'Berlin').click
  #   wait_for_room_change @room2.channel
  #   Pusher.url = ENV['PUSHER_URL']
  #   Pusher.trigger(
  #     @room2.channel, \
  #     'new_message', \
  #     '{"id": 12,' \
  #     '"body":"hello you!",' \
  #     '"created_at":"2015-06-04T10:35:42.778Z",' \
  #     '"user": "franek"}'
  #   )
  #   # screenshot_and_save_page
  #   expect(page).to have_content('hello you!')
  #   # screenshot_and_save_page
  # end

  # scenario 'Server sends a message to different channel' do
  #   Pusher.url = ENV['PUSHER_URL']
  #   Pusher.trigger(
  #     @room2.channel, \
  #     'new_message', \
  #     '{"id": 13,' \
  #     '"body":"Where am I?",' \
  #     '"created_at":"2015-06-04T10:35:42.778Z",' \
  #     '"user": "franek"}'
  #   )
  #   expect(page).to have_no_content('Where am I?!')
  # end

  after(:each) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end
end
