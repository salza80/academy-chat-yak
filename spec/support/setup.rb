module FeatureTestsSetup
  def setup_rooms
    @room1 = create(:chat_room, name: 'Roomie') do |chat_room|
      create(:message, body: 'Hi!', chat_room: chat_room)
    end
    @room2 = create(:chat_room, name: 'Berlin') do |chat_room|
      create(:message, body: 'Hello Berlin', chat_room: chat_room)
    end
    @room3 = create(:chat_room, name: 'Melbourne') do |chat_room|
      chat_room.messages = build_list(:message, 25)
    end
    @room4 = create(:chat_room, name: 'Empty Room')
  end

  def setup_environment
    Capybara.current_driver = :selenium
    Capybara.default_wait_time = 5
    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new(
      provider: 'github',
      uid: '87654321',
      info: { first_name: 'Franek', 'last_name': 'Kimono', nickname: 'franek' }
    )
    OmniAuth.config.test_mode = true
  end

  def login
    visit '/'
    click_button 'Log in with Github'
    wait_for_pusher
  end
end

RSpec.configure do |config|
  config.include FeatureTestsSetup, type: :feature
end
