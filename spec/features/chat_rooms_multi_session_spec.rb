require 'rails_helper'

feature 'pusher_actions' do
  before(:each) do
    setup_rooms
    multi_session_login
  end

  scenario 'User adds new room' do
    @session1.fill_in 'Room name', with: 'New room'
    @session1.click_button 'Add'
    expect(@session1).not_to have_text('Are you sure you want to add a new room?')
    @session1.click_button('Yes')
    expect(@session1).to have_css('span', text: 'New room')
    # test it clicks on new room automatically
    expect(@session1).to have_css('h3', text: 'New room')
    # test other users see new room in list
    expect(@session1).to have_css('span', text: 'New room')
    # test it does not select new room for other users
    expect(@session2).to have_no_css('h3', text: 'New room')
  end

  scenario 'Room is removed from all sessions and active users in the room exit' do
    @session3 =  new_session_login 'user', '3'
    @session1.find('.room-list-item', text: 'Empty Room').click
    @session2.find('.room-list-item', text: 'Empty Room').click
    @session3.find('.room-list-item', text: 'Berlin').click
    @session1.find('.room-list-item', text: 'Empty Room').find('.glyphicon').click
    @session1.click_button('Yes')
    expect(@session1).not_to have_text('Are you sure you want to delete this room?')
    expect(@session1).not_to have_text('Empty Room')
    expect(@session1).to have_css('h3', text: 'Roomie')
    # test other users in the room have exited
    expect(@session2).not_to have_text('Empty Room')
    expect(@session2).to have_css('h3', text: 'Roomie')
    # test other users not in the room, have not changed room
    expect(@session3).not_to have_text('Empty Room')
    expect(@session3).to have_css('h3', text: 'Berlin')
  end

  after(:each) do
    multi_session_clean_up
  end
end
