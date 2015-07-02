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

  after(:each) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end
end
