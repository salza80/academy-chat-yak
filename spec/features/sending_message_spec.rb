require "rails_helper"

feature "Sending message", :type => :feature do
  before(:all) do
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

  after(:all) do
    OmniAuth.config.mock_auth[:github] = nil
    Capybara.reset!
  end
end
