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
    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new(
      provider: 'github',
      uid: '87654321',
      info: { first_name: 'Franek', 'last_name': 'Kimono', nickname: 'franek' }
    )
  end

  def login
    visit '/'
    click_button 'Log in with Github'
    wait_for_pusher
  end

  def set_omniauth(first_name, last_name)
    OmniAuth.config.mock_auth[:github] = OmniAuth::AuthHash.new(
      provider: 'github',
      uid: Random.rand(87_000_000...88_000_000).to_s,
      info: { first_name: first_name, last_name: last_name, nickname: first_name + last_name }
    )
  end

  def new_session_login(first_name, last_name)
    new_session =  Capybara::Session.new(:selenium, Capybara.app)
    set_omniauth first_name, last_name
    new_session.visit '/'
    new_session.click_button 'Log in with Github'
    new_session
  end

  def multi_session_login
    @session1 =  new_session_login 'user', '1'
    @session2 =  new_session_login 'user', '2'
  end

  def multi_session_clean_up
    @session1.driver.quit
    @session2.driver.quit
    Capybara.reset!
    Capybara.reset_session!
  end
end

RSpec.configure do |config|
  config.include FeatureTestsSetup, type: :feature
end
