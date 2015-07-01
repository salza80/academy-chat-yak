require 'rails_helper'

feature 'pusher_actions' do
  before(:each) do
    setup_rooms
    multi_session_login
  end

  scenario 'User adds new room' do
    @session1.fill_in 'Room name', with: 'New room'
    @session1.click_button 'Add'
    expect(@session1).to have_css('span', text: 'New room')
    # test it clicks on new room automatically
    expect(@session1).to have_css('h1', text: 'New room')
    # test other users see new room in list
    expect(@session1).to have_css('span', text: 'New room')
    # test it does not select new room for other users
    expect(@session2).to have_no_css('h1', text: 'New room')
  end

  scenario 'Empty room is destroyed on remove' do
    @session1.find('.room-list-item', text: 'Empty Room').find('.glyphicon').click
    expect(@session1).not_to have_text('Empty Room')
    # test room is removed for other users
    # commented out, not implemented yet
    # expect(@session2).not_to have_text('Empty Room')
    expect(ChatRoom.all.count).to equal(3)
  end

  after(:each) do
    multi_session_clean_up
  end
end
