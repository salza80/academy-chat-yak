require 'test_helper'
class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:alice)
  end

  test 'is user valid' do
    assert @user.valid?
    assert @user.errors.empty?
  end

  test 'is user without name not valid' do
    @user.name = nil
    assert_not @user.valid?
    assert_not @user.errors.empty?
  end
end
