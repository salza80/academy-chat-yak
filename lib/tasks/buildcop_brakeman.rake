namespace :buildcop do
  desc 'Run "brakeman"'
  task :brakeman do
    require 'brakeman'

    tracker = Brakeman.run(app_path: '.', config_file: 'config/buildcop/brakeman.yml')
    abort('Brakeman failed!') if ENV['FAIL_ON_ERROR'] && tracker.filtered_warnings.any?
  end
end
