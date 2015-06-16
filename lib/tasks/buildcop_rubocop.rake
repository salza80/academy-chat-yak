namespace :buildcop do
  require 'rubocop/rake_task'

  desc 'Run "rubocop"'
  RuboCop::RakeTask.new(:rubocop) do |task|
    task.verbose = false # avoid printint 'Running RuboCop..' before tests
    task.fail_on_error = ENV['FAIL_ON_ERROR'] == 'true'
    task.options = %w(--display-cop-names --fail-level convention --config config/buildcop/.rubocop.yml)
  end
end
