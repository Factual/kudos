# Local setup
1. Install Docker (use [Docker for Mac](https://docs.docker.com/docker-for-mac/) if you're on a Mac).
1. Run `docker-compose build` to build the web container.
1. Run `docker-compose run web rails db:create` to create the database.
1. Copy `docker-compose.override.yml.example` to `docker-compose.override.yml` (and optionally set a port you'd like kudos to run on locally).
1. Run `docker-compose up` to start the server.

# Executing commands in docker
Since we're using docker-compose, you can run `docker-compose run [SERVICE] [COMMAND]`. For instance:

* To get an interactive psql session, run `docker-compose run db psql -h db -U postgres`
* To get an interactive rails console, run `docker-compose run web rails c`
* To drop into a shell, run `docker-compose run [SERVICE] /bin/bash`
* To migrate the database, run `docker-compose run web rails db:migrate`

Since the docker-compose file *mounts* the working directory inside the docker container, any changes the filesystem inside the docker are reflected locally.

## Using byebug
1. Start the db service in non-interactive mode with `docker-compose up db`
1. Start the web service in interactive mode with `docker-compose run --service-ports web`. If you keep this open, you'll be able to use byebug in interactive mode.
