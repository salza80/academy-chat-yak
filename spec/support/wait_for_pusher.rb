module WaitForPusher
  def wait_for_pusher
    Timeout.timeout(Capybara.default_wait_time) do
      loop until pusher_connected
    end
  end

  def wait_for_room_change(channel)
    Timeout.timeout(Capybara.default_wait_time) do
      loop until room_connected(channel)
    end
  end

  def room_connected(channel)
    channel_path = "Yak.PusherManager.channelGroup['Messages'].channel"
    page.evaluate_script(channel_path + ".name == '" + channel +
     "' && " + channel_path + '.subscribed == true')
  end

  def pusher_connected
    page.evaluate_script('Yak.PusherManager.pusher.connection.state') == 'connected'
  end

  def session_wait_for_pusher(session)
    Timeout.timeout(Capybara.default_wait_time) do
      loop until session_pusher_connected session
    end
  end

  def session_pusher_connected(session)
    session.evaluate_script('Yak.PusherManager.pusher.connection.state') == 'connected'
  end
end

RSpec.configure do |config|
  config.include WaitForPusher, type: :feature
end
