require 'rainbow/ext/string'

desc 'Run all "buildcop" code analyzers'
task :buildcop do
  %w(rubocop brakeman coffeelint scss-lint haml-lint jslint-v8 flay simplecov).each do |name|
    tool = Rake.application.lookup("buildcop:#{name}")
    if tool.present?
      display_tool_name(name)
      tool.invoke
    end
  end
end

def display_tool_name(name)
  puts '=' * 50
  puts "Running #{name}".color(:magenta)
  puts '=' * 50
end
