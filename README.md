# Setup
1. Install Docker (use [Docker for Mac](https://docs.docker.com/docker-for-mac/) if you're on a Mac).
1. Run `docker-compose build` to build the web container.
1. Run `docker-compose run web rails db:create` to create the database.
1. Run `docker-compose up` to start the server.

Note that this will start the the server on port 3000 on the docker, but it will be forwarded to a random port on the host. To specify the forwarded port, copy `docker-compose.override.yml.example` to `docker-compose.override.yml`. By default, this will set the forwarded port to 3000, but edit the override file to your environment since it is included in gitignore.
