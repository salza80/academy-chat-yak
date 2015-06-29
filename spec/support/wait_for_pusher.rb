module WaitForPusher
  def wait_for_pusher
    Timeout.timeout(Capybara.default_wait_time) do
      loop until pusher_connected
    end
  end

  def wait_for_room_change(room_id)
    Timeout.timeout(Capybara.default_wait_time) do
      loop until room_connected(room_id)
    end
  end

  def room_connected(room_id)
    channel_path = "Yak.PusherManager.channelGroup['Messages'].channel"
    channel_name = 'room_' + room_id.to_s
    page.evaluate_script(channel_path + ".name == '" + channel_name +
     "' && " + channel_path + '.subscribed == true')
  end

  def pusher_connected
    page.evaluate_script('Yak.PusherManager.pusher.connection.state') == 'connected'
  end
end

RSpec.configure do |config|
  config.include WaitForPusher, type: :feature
end
