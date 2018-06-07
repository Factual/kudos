# Kudos
[![Docker Build Status](https://img.shields.io/docker/build/factual/kudos.svg)](https://hub.docker.com/r/factual/kudos/)

# Local setup
1. Install Docker (use [Docker for Mac](https://docs.docker.com/docker-for-mac/) if you're on a Mac).
1. Copy `docker-compose.override.yml.example` to `docker-compose.override.yml` and fill in any placeholder settings.
1. Run `./quickstart.sh`. (The file has step-by-step descriptions if you'd rather run it yourself.)
1. Go to [http://localhost:3000/](http://localhost:3000/) to visit Kudos!

After installing the first time, you can start kudos by running `docker-compose up`.

Docker-compose starts the db container and the web container. The db container starts with a Postgres server and the web container uses foreman to run (a) the webpack build tool and (b) the rails server.

## Startup problems
### There is a server already running
Delete the `tmp/pids/server.pid` file. This is because of an improper shutdown.

### The port is already taken
Either change the port (in `docker-compose.override.yml`) or make sure you don't have anything running on port 3000. Try running a `docker ps` to see if you have any containers forwarded to port 3000, then `docker kill [CID]` to remove them.

### "Couldn't find User with 'id'=1"
You have a stale cookie in your browser. Remove the `_kudos_session` cookie from the domain name you're accessing.

# Using the docker image

## Executing arbitrary commands
Since we're using docker-compose, you can run `docker-compose run [SERVICE] [COMMAND]`. For instance:

* To get an interactive psql session, run `docker-compose run db psql -h db -U postgres`
* To get an interactive rails console, run `docker-compose run web rails c`
* To drop into a shell, run `docker-compose run [SERVICE] /bin/bash`
* To migrate the database, run `docker-compose run web rails db:migrate`
* To restore the database using an S3 backup, run `docker-compose run web rails db:restore`
* To install node packages, run `docker-compose run web npm install` (this will run the outer *and* inner `npm install`)
* To install new gems, run `docker-compose run web bundle install`
* To install a new gem, run `docker-compose run web bundle install [GEM_NAME]` then commit the updated `Gemfile.lock` file
* To install a new node package, run `docker-compose run web npm install --save [MODULE_NAME]` then commit the updated `package.json` file

Since the docker-compose file *mounts* the working directory inside the docker container, any changes the filesystem inside the docker are reflected locally. This is for ease of developer user and does *not* happen in production. If you need to install anything in production, it must be in the image's `Dockerfile`. (That might mean running things twice. For instance, `npm install` runs in `Dockercompose` and then again in quickstart: the first will affect the image's filesystem, so it can be run in production, and the second will change your locally mounted filesystem, for development.)

## Using Byebug (other other interactive tools)
You can use this same idea to use any interactive tool. Byebug is an interactive ruby debugger that runs inside www.

1. Start the db service in non-interactive mode with `docker-compose up -d db`
1. Start webpack on its own with `docker-compose run web foreman run -f Procfile.dev client`
1. Start rails on its own with `docker-compose run --service-ports web foreman run -f Procfile.dev web`. If you keep this open, you'll be able to use byebug in interactive mode.

## Running the server in the background
You can run any `docker-compose up` or `docker-compose run` command with the `-d` flag to start it in detached mode. You can find it again by running `docker ps`, then attach using `docker attach [CONTAINER_ID]`. You can disconnect by typing `Ctrl+p Ctrl+q`. You can kill the docker with `docker kill [CONTAINER_ID]` or all of them with `docker-compose down`.

You can also use multiple terminals (windows, tabs, tmux, screen, byobu, etc.).
