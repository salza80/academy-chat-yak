require 'rainbow/ext/string'

namespace :buildcop do
  desc 'Run "coffeelint"'
  task :coffeelint do
    require 'coffeelint'

    @count = @warn_count = @error_count = 0
    %w(app spec test).map do |dir|
      Coffeelint.lint_dir(dir, config_file: 'config/buildcop/coffeelint.json') do |filename, lint_report|
        @count += 1
        if lint_report.present?
          add_issues_count(lint_report)
          display_issue(filename, lint_report)
        end
      end
    end
    display_coffeelint_summary
    abort('CoffeeLint failed!') if ENV['FAIL_ON_ERROR'].present? && @error_count > 0
  end
end

private

def add_issues_count(lint_report)
  lint_report.each do |lr|
    case lr['level']
    when 'warn'
      @warn_count += 1
    when 'error'
      @error_count += 1
    end
  end
end

def display_issue(filename, lint_report)
  Coffeelint.display_test_results(filename, lint_report)
end

def display_coffeelint_summary
  puts
  print "#{@count} files inspected, "
  if @warn_count == 0 && @error_count == 0
    puts colorized_no_offences
  else
    puts "#{colorized_error}, #{colorized_warn} detected"
  end
end

def colorized_no_offences
  "no offences detected".color(:green)
end

def colorized_warn
  if @warn_count > 0
    "#{@warn_count} warnings".color(:yellow)
  else
    "#{@warn_count} warnings"
  end
end

def colorized_error
  if @error_count > 0
    print "#{@error_count} errors".color(:red)
  else
    print "#{@error_count} errors"
  end
end
