module WaitForPusher
  def wait_for_pusher
    Timeout.timeout(Capybara.default_wait_time) do
      loop until pusher_connected
    end
  end

  def pusher_connected
    page.evaluate_script('Yak.PusherManager.pusher.connection.state') == 'connected'
  end
end

RSpec.configure do |config|
  config.include WaitForPusher, type: :feature
end
