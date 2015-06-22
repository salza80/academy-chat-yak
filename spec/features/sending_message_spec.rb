require 'rails_helper'
require 'pusher'

feature 'Sending message' do
  before(:all) do
    @room1 = create(:chat_room, name: 'Roomie') do |chat_room|
      create(:message, body: 'Hi!', chat_room: chat_room)
    end
    @room2 = create(:chat_room, name: 'Berlin') do |chat_room|
      create(:message, body: 'Hello Berlin', chat_room: chat_room)
    end
    @room3 = create(:chat_room, name: 'Melbourne') do |chat_room|
      chat_room.messages = build_list(:message, 25)
    end
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
    find('.room-list-item', text: 'Roomie').click
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

  scenario 'User switches chat rooms' do
    expect(page).to have_text('Hi!')
    find('.room-list-item', text: 'Berlin').click
    expect(page).to have_text('Hello Berlin')
    expect(page).to have_no_text('Hi!')
  end

  scenario 'User adds new room' do
    fill_in 'Room name', with: 'New room'
    click_button 'Add'
    sleep 2
    expect(page).to have_text('New room')
  end

  scenario 'There are no older messages to scroll' do
    find('.room-list-item', text: 'Berlin').click
    expect(page).not_to have_text('Get older messages')
  end

  scenario 'There are older messages to scroll' do
    find('.room-list-item', text: 'Melbourne').click
    expect(page).to have_text('Get older messages')
    expect(page).to have_css('div.message', count: 20)
  end

  scenario 'Older messages load' do
    find('.room-list-item', text: 'Melbourne').click
    expect(page).to have_css('div.message', count: 20)
    page.find('a', text: 'Get older messages').click
    expect(page).to have_css('div.message', count: 25)
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
