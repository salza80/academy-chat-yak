require 'rails_helper'
require 'pusher'

feature 'Rooms management' do
  before(:all) do
    setup_rooms
  end

  before(:each) do
    setup_environment
    login
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
    expect(page).to have_text('New room')
    expect(page).to have_no_text('Hi!')
  end

  scenario 'There are no older messages to scroll' do
    find('.room-list-item', text: 'Berlin').click
    expect(page).not_to have_text('Get older messages')
  end

  scenario 'Older messages load' do
    find('.room-list-item', text: 'Melbourne').click
    expect(page).to have_text('Get older messages')
    expect(page).to have_css('div.message', count: 20)
    page.find('a', text: 'Get older messages').click
    expect(page).to have_css('div.message', count: 25)
  end

  scenario 'Empty room is destroyed on remove' do
    find('.room-list-item', text: 'Empty Room').find('.glyphicon').click
    expect(page).not_to have_text('Empty Room')
    expect(ChatRoom.all.count).to equal(4)
  end

  scenario 'Not empty room is kept in database on remove' do
    find('.room-list-item', text: 'Roomie').find('.glyphicon').click
    expect(page).not_to have_text('Roomie')
    expect(ChatRoom.all.count).to equal(4)
  end

  after(:all) do
    @room1.destroy
    @room2.destroy
    @room3.destroy
    @room4.destroy
  end

  after(:each) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end
end
