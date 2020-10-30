# User-Generated Guides to Records Prototype Application

### Dependencies

The following system dependencies must be installed to work on this project in your local development environment:

- [ASDF Version Manager](https://asdf-vm.com/#/)
- [Ruby 2.7.1](https://github.com/asdf-vm/asdf-ruby) (installed via ASDF)
- [Node.js 14.15.0](https://github.com/asdf-vm/asdf-nodejs) (installed via ASDF)
- [PostgreSQL 12](https://www.postgresql.org/download/) (installed with your preferred package manager or approach)

_NOTE: You may need additional system binaries to be able to proceed with installing any of the above. See [https://gorails.com/setup](https://gorails.com/setup) and select your operating system to learn more._

### Working on this Project

Clone this project and change to it. Then attach to the Heroku application.

```shell
git clone -o github git@github.com:Threespot/nara-ugfa.git
cd nara-ugfa
```

Now install the Ruby and Node.js dependencies:

```shell
bundle install
yarn install
```

Create a Postgres Database and run the database migrations:

```shell
createdb nara_ugfa_dev
bundle exec rails db:migrate
```

### Configure the Environment

This codebase does not contain any credentials. Instead, developers [store configuration in the environment](http://12factor.net/config). Locally, you store credentials in a special `.env` file in the project folder.

✋ **IMPORTANT:** Always store configuration in the environment. Never commit code that contains credentials. If you commit code with credentials in it, those credentials are no longer safe to use and must be replaced.

Make your environment file:

```
touch .env
open .env
```

Copy the contents of the [`env.example`](/env.example) file

The file is in key-value format, with one key per line. When you boot the Rails server, it will look for this file and set the specified environment variables. Each variable is described below.

<details>
  <summary>Variable Details</summary>

##### RAILS_ENV and RACK_ENV

These variables cause the Rails app to boot differently depending on the working context.

- They should both be set to `development` in development mode
- They should both be set to `production` on Heroku.

##### DATABASE_URL

This is a Postgres URI to your database. It should be in the form `postgres://localhost/<DATABASE_NAME>`.

If you are not using Postgres.app, you might need to provide a user and password, so the URI will be in the form `postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>`.

##### WEB_CONCURRENCY

The number of Rails servers to create per Heroku dyno.

- In development this should be `1`. (Just one server for you)
- On Heroku it’s `2` or `3`, depending on how much memory you have available.

##### EXPECTED_HOSTNAME

This should be set to the scheme and domain name that the server will run on.

In development, if you expect to access the application via your network address or IP address, it needs to be set accordingly:

- If you want to use something like `http://0.0.0.0:8080`, set this value to `http://0.0.0.0`

In production, this should be the official URL of the server, ex. `https://www.threespot.com`. Visits to the production URL that are not on this address will be forcibly redirected to it.

This setting does not include the port, see below.

##### PORT

The port for the application to listen on.

- In development, you should pick your favorite userspace port to develop on, like `8080` or `5000`.
- In production, this is set for you by Heroku. Do not change Heroku’s value.

##### SECRET_KEY_BASE

This variable sets the key that Rails uses to sign cookie and sessions. Changing this key after it's set will rotate every cookie and session on the site. It should be a random string of at least 64 characters, or the application may be vulnerable to session hijacking. Generate a good value with `openssl rand -hex 32`

- Heroku sets this for you in production.
- Your development and Heroku key should be **different**.

</details>

### What else goes in the environment?

Any password, key, or username needed for your app to connect to external services. Make the key names match their associated documentation and don't be afraid to make them long.

### Booting the App

If your dependencies are installed and the environment is A-OK, you should be able to start the Rails server and Webpack dev server with:

```shell
yarn start
```
