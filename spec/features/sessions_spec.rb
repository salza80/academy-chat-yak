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

  scenario "user naviates to a chatroom via URL" do
    expect(page).to have_css('h3', text: @room1.name)
    visit 'http://google.com' 
    visit '/#/room/' + @room3.id.to_s
    expect(page).to have_css('h3', text: @room3.name)
  end

  after(:each) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end
end
