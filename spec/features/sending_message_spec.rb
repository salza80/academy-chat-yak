require 'rails_helper'
require 'pusher'

feature 'Sending message' do
  before(:all) do
    @room1 = create(:chat_room) do |chat_room|
      create(:message, chat_room: chat_room)
    end
    @room2 = create(:chat_room, name: 'Berlin')
  end

  before(:each) do
    Capybara.current_driver = :selenium
    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new(
      provider: 'github',
      uid: '87654321',
      info: { first_name: 'Franek', 'last_name': 'Kimono', nickname: 'franek' }
    )
    OmniAuth.config.test_mode = true
    visit '/'
    click_button 'Log in with Github'
    first('.chat-room-item').click
  end

  scenario 'User sends a message' do
    fill_in 'Enter message', with: 'Hello world!'
    click_button 'Send'
    expect(page).to have_text('Hello world!')
  end

  scenario 'Server sends a message' do
    sleep 2

    Pusher.url = ENV['PUSHER_URL']
    Pusher.trigger(
      'room_' + @room1.id.to_s, \
      'new_message', \
      '{"id": 12,' \
      '"body":"hello you!",' \
      '"created_at":"2015-06-04T10:35:42.778Z",' \
      '"user": "franek"}'
    )
    screenshot_and_save_page
    expect(page).to have_content('hello you!')
    screenshot_and_save_page
  end

  scenario 'Server sends a message to different channel' do
    sleep 2

    Pusher.url = ENV['PUSHER_URL']
    Pusher.trigger(
      'room_' + @room2.id.to_s, \
      'new_message', \
      '{"id": 13,' \
      '"body":"Where am I?",' \
      '"created_at":"2015-06-04T10:35:42.778Z",' \
      '"user": "franek"}'
    )
    expect(page).to have_no_content('Where am I?!')
  end

  scenario 'User adds new room' do
    fill_in 'Room name', with: 'New room'
    click_button 'Add'
    expect(page).to have_text('New room')
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
