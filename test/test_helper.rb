# frozen_string_literal: true
ENV['RAILS_ENV'] ||= 'test'
# require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'omni_auth_test_helper'
#require_relative '../spec/omni_auth_test_helper'
# require 'rspec/autorun'
# require 'rspec/rails'

# include RSpec

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
#  fixtures :all

  # Set up user fixtures
  fixtures :users

  # Add more helper methods to be used by all tests here...

  # Simulate oath login
  def login

    OmniAuthTestHelper.valid_google_login_setup
    visit root_path
    click_link "Sign in with Google"

=begin
    RSpec.describe "GET '/auth/google/callback'" do

      before(:each) do
        valid_google_login_setup
        get "auth/google/callback"
        request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:google]
      end

      it "should set user_id" do
        expect(session[:user_id]).to eq(User.last.id)
      end

      it "should redirect to root" do
        expect(response).to redirect_to root_path
      end
    end

    describe "GET '/auth/failure'" do

      it "should redirect to root" do
        get "/auth/failure"
        expect(response).to redirect_to root_path
      end
    end
=end

  end
end
