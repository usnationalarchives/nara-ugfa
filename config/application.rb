require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module NaraUgfa
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # --------------------------------------------------------------------------
    # SECRET KEY BASE
    # This secret string is used to sign sessions and cookies for your application.
    # Changing it will invalidate all current sessions.
    # The secret should be at least 32 completely random characters.
    # --------------------------------------------------------------------------

    # Load the secret key from the environment.
    config.secret_key_base = ENV.fetch("SECRET_KEY_BASE")


    # Add auto-load paths
    config.autoload_paths += Dir["#{config.root}/app/serializers"]
  end
end
