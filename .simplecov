# This is the global configuration file of the SimpleCov gem.
# More on: https://github.com/colszowka/simplecov#configuring-simplecov

require 'simplecov-console'
require 'simplecov-json'

SimpleCov.start 'rails' do
  formatter SimpleCov::Formatter::MultiFormatter[
    SimpleCov::Formatter::Console,
    SimpleCov::Formatter::JSONFormatter
  ]
end
