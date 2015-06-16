namespace :buildcop do
  require 'flay_task'

  desc 'Run "flay"'
  FlayTask.new do |task|
    task.verbose   = true
    # task.dirs     -= ['test'] # uncomment this to exclude 'test' directory in flay
    # task.dirs     -= ['spec'] # uncomment this to exclude 'spec' directory in flay
    task.threshold = ENV['FAIL_ON_ERROR'].nil? ? Float::INFINITY : 200 # default threshold value: 200
  end
end
