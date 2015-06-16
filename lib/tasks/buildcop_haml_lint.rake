require 'rainbow/ext/string'

namespace :buildcop do
  desc 'Run "haml-lint"'
  task :'haml-lint' do
    require 'haml_lint'
    require 'haml_lint/cli'
    logger = HamlLint::Logger.new(STDOUT)
    status = HamlLint::CLI.new(logger).run(%w(app/views -c config/buildcop/.haml-lint.yml))
    display_haml_lint_summary(status)

    abort('haml-lint failed!') if ENV['FAIL_ON_ERROR'] && status != 0
  end
end

private

def display_haml_lint_summary(status)
  puts
  case status
  when 0
    puts "No offences detected".color(:green)
  when 65
    puts "Warnings detected".color(:yellow)
  else
    puts "Other error".color(:red)
  end
end
