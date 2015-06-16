namespace :buildcop do
  desc 'Run "jslint-v8"'
  task :'jslint-v8' do
    require 'jslint-v8'

    target    = lint_files
    formatter = JSLintV8::Formatter.new(STDOUT)
    runner    = JSLintV8::Runner.new(target)
    browser   = true
    wsh       = true
    # Any further configuration can be done here (these are merged with the default options)
    # You can check the default configuration by running `jslint-v8 -h`
    lint_options = {
      browser: true,
      predef: ["fetch", "Promise", "Pusher"]
    }
    runner.jslint_options.merge!(lint_options)

    lint_result = runner.run { |_, errors| formatter.tick(errors) }
    print "\n"
    formatter.summary(target, lint_result)

    abort('jslint suite failed!') if ENV['FAIL_ON_ERROR'] && lint_result.any?
  end
end

private

def lint_files
  included_files = Dir.glob('**/*.js')
  excluded_paths = [
    'vendor/**/*.js',
    'node_modules/**/*.js',
    'tmp/**/*.js',
    'public/**/*.js',
    'app/assets/javascripts/init_rollbar.js'
  ]
  excluded_files = excluded_paths.map { |path| Dir.glob(path) }.inject(:+)
  (included_files - excluded_files).sort
end
