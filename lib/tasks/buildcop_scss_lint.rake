require 'rainbow/ext/string'

namespace :buildcop do
  desc 'Run "scss-lint"'
  task :'scss-lint' do
    require 'scss_lint'
    require 'scss_lint/cli'

    status = SCSSLint::CLI.new.run(%w(app/assets/stylesheets -c config/buildcop/.scss-lint.yml))
    display_scss_lint_summary(status)
    abort('scss-lint failed!') if ENV['FAIL_ON_ERROR'].present? && status > 0
  end
end

private

def display_scss_lint_summary(status)
  puts
  case status
  when 0
    puts "No offences detected".color(:green)
  when 1
    puts "Warnings detected (no errors)".color(:yellow)
  when 2
    puts "One or more errors were reported (and any number of warnings)".color(:red)
  else
    puts "Other error".color(:red)
  end
end
