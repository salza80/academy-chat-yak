require "rails_helper"
require 'pusher'
feature "Sending message", :type => :feature do
  before(:each) do
    Capybara.current_driver = :selenium
    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new({
                  provider: 'github',
                  uid: '87654321',
                  info: {first_name: "Franek", "last_name": 'Kimono', nickname: "franek" },
    })
    OmniAuth.config.test_mode = true
    visit "/"
    click_button "Log in with Github"
  end

  scenario "User sends a message" do
    fill_in "Body", with: "Hello world!"
    click_button "Send"
    expect(page).to have_text("Hello world!")
  end

  scenario "Server sends a message" do
    sleep 2
    Pusher.url = ENV['PUSHER_URL']
    Pusher.trigger "test_channel", "my_event", '{"body":"hello you!","created_at":"2015-06-04T10:35:42.778Z","user":{"name":"franek"}}'
    screenshot_and_save_page
    expect(page).to have_content("hello you!")
    screenshot_and_save_page
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
