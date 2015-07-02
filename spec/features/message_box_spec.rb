require 'rails_helper'

feature 'pusher_actions' do
  before(:each) do
    setup_rooms
    multi_session_login
  end

  scenario 'user sends a message to another user in same chatroom' do
    @session1.find('.room-list-item', text: 'Berlin').click
    @session2.find('.room-list-item', text: 'Berlin').click
    @session1.fill_in 'Enter message', with: 'Hello world!'
    @session1.click_button 'Send'
    expect(@session1).to have_text('Hello world!')
    expect(@session2).to have_text('Hello world!')
    expect(@session2).to have_text('user1')
  end

  scenario 'user sends a message to different chatroom' do
    @session1.find('.room-list-item', text: 'Berlin').click
    @session2.find('.room-list-item', text: 'Roomie').click
    @session1.fill_in 'Enter message', with: 'Hello world!'
    @session1.click_button 'Send'
    expect(@session1).to have_text('Hello world!')
    expect(@session2).to have_no_text('Hello world!')
  end

  scenario 'number/list of users in chatroom displays' do
    @session1.find('.room-list-item', text: 'Melbourne').click
    @session2.find('.room-list-item', text: 'Berlin').click
    expect(@session1).to have_css('h1', text: '1 user online')
    expect(@session1).to have_css('.user-list-col', text: 'user1')
    expect(@session1).to have_no_css('.user-list-col', text: 'user2')
    expect(@session2).to have_css('h1', text: '1 user online')
    # test adding a user
    @session2.find('.room-list-item', text: 'Melbourne').click
    expect(@session2).to have_css('h1', text: '2 users online')
    expect(@session2).to have_css('.user-list-col', text: 'user1')
    expect(@session1).to have_css('h1', text: '2 users online')
    expect(@session1).to have_css('.user-list-col', text: 'user2')
    # test removing a user
    @session1.find('.room-list-item', text: 'Berlin').click
    expect(@session1).to have_css('h1', text: '1 user online')
    expect(@session2).to have_css('h1', text: '1 user online')
    expect(@session2).to have_no_css('.user-list-col', text: 'user1')
  end

  after(:each) do
    multi_session_clean_up
  end
end
