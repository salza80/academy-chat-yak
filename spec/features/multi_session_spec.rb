require 'rails_helper'

feature 'pusher_actions' do
  before(:each) do
    setup_rooms
    multi_session_login
  end

  scenario 'another user sends a message' do
    @session1.find('.room-list-item', text: 'Berlin').click
    @session2.find('.room-list-item', text: 'Berlin').click
    @session1.fill_in 'Enter message', with: 'Hello world!'
    @session1.click_button 'Send'
    expect(@session1).to have_text('Hello world!')
    expect(@session2).to have_text('Hello world!')
    expect(@session2).to have_text('user1')
  end

  scenario 'number of users in channel' do
    @session1.find('.room-list-item', text: 'Melbourne').click
    @session2.find('.room-list-item', text: 'Berlin').click
    expect(@session1).to have_css('h1', text: '1 user online')
    expect(@session2).to have_css('h1', text: '1 user online')
    @session2.find('.room-list-item', text: 'Melbourne').click
    expect(@session1).to have_css('h1', text: '2 users online')
  end

  after(:each) do
    multi_session_clean_up
  end
end
