require 'rainbow/ext/string'

namespace :buildcop do
  desc 'Examine "simplecov" report'
  task :simplecov do
    abort("Coverage report doesn't exist. Run tests first!") unless File.exist?('coverage/coverage.json')

    require 'json'
    require 'yaml'

    config          = YAML.load_file(File.expand_path('../../../config/buildcop/.simplecov.yml', __FILE__))
    coverage_report = JSON.parse(File.read('coverage/coverage.json'))

    covered_percent = coverage_report['metrics']['covered_percent']
    threshold       = config['threshold']

    if covered_percent < threshold
      puts "Coverage (#{covered_percent}%) expected to be higher than #{threshold}%.".color(:red)
      abort("SimpleCov failed!") if ENV['FAIL_ON_ERROR']
    else
      puts "Coverage OK - #{covered_percent.to_i}% is higher than #{threshold}%".color(:green)
    end
  end
end
