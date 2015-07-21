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

  scenario 'Filter messages' do
    create(:message, body: 'Welcome to Melbourne', chat_room: ChatRoom.find_by_name('Melbourne'))
    find('.room-list-item', text: 'Melbourne').click
    fill_in 'Search message', with: 'Melbourne'
    find('.glyphicon-search').click
    expect(page).to have_text('Welcome to Melbourne')
    expect(page).not_to have_text('Hi!')
  end

  scenario 'Load only matching older messages' do
    ChatRoom.find_by_name('Melbourne').messages = create_list(:message, 25, body: 'Bye!')
    find('.room-list-item', text: 'Melbourne').click
    fill_in 'Search message', with: 'Bye!'
    find('.glyphicon-search').click
    find('a', text: 'Get older messages').click
    expect(page).to have_text('Bye!')
    expect(page).not_to have_text('Hi!')
  end

  scenario 'Not empty room is kept in database on remove' do
    find('.room-list-item', text: 'Roomie').find('.glyphicon').click
    click_button('Yes')
    expect(page).not_to have_text('Roomie')
    expect(ChatRoom.all.count).to equal(4)
  end

  scenario 'Empty room is destroyed on remove' do
    find('.room-list-item', text: 'Empty Room').find('.glyphicon').click
    click_button('Yes')
    expect(page).not_to have_text('Empty Room')
    expect(ChatRoom.all.count).to equal(3)
  end

  after(:each) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end
end
