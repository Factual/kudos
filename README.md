# Setup
1. Install Docker (use [Docker for Mac](https://docs.docker.com/docker-for-mac/) if you're on a Mac).
1. Run `docker-compose build` to build the web container.
1. Run `docker-compose run web rails db:create` to create the database.
1. Run `docker-compose up` to start the server on port 3000.

If you want to override any settings for your local environment, do so in a file named `docker-compose.override.yml`. This is ignored in git and will override the default `docker-compose.yml` file.
