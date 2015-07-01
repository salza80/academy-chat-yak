require 'rails_helper'
require 'pusher'

feature 'Rooms management' do
  before(:each) do
    setup_rooms
    setup_environment
    login
  end

  scenario 'user switches chat rooms' do
    expect(page).to have_text('Hi!')
    find('.room-list-item', text: 'Berlin').click
    expect(page).to have_text('Hello Berlin')
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

  scenario 'Not empty room is kept in database on remove' do
    find('.room-list-item', text: 'Roomie').find('.glyphicon').click
    expect(page).not_to have_text('Roomie')
    expect(ChatRoom.all.count).to equal(4)
  end

  after(:each) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end
end
