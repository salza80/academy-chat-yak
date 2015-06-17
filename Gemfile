source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.1'

group :production do
  gem 'rails_12factor'
end

gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# Use bootstrap for styles
gem 'bootstrap-sass', '~> 3.2.0'

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'haml-rails', '>= 0.3.4'

gem 'react-rails', '~> 1.0'

# Use omniauth for github authentication
gem 'omniauth-github'
gem 'omniauth-openid'

# Use dotenv to keep environment variables
gem 'dotenv'

#Use rollbar
gem 'rollbar', '~> 1.5.1'

#Use pusher to send messages to browser
gem 'pusher'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  #Use 'pry' for debugging
  gem 'pry'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'capybara'

  gem 'selenium-webdriver'

  # Rspec for testing with data sampled with factory girl gem
  gem 'rspec-rails', '~> 3.0'

  gem 'factory_girl_rails', '~> 4.0' 

  gem 'database_cleaner'

  gem 'pusher-fake'

  gem 'capybara-screenshot'
end

group :development do
  gem 'rainbow', '~> 2.0', require: false
  gem 'rubocop', '~> 0.30', git: 'https://github.com/bbatsov/rubocop', branch: 'master', require: false
  gem 'brakeman', '~> 3.0', require: false
  gem 'coffeelint', '~> 1.9', require: false
  gem 'scss-lint', '~> 0.36', require: false
  gem 'haml_lint', '~> 0.14', require: false
  gem 'jslint-v8', '~> 1.1', require: false
  gem 'flay', '~> 2.6', require: false
  gem 'simplecov', '~> 0.9', require: false
  gem 'simplecov-console', '~> 0.2', require: false
  gem 'simplecov-json', '~> 0.2', require: false
end

ruby '2.2.2'
