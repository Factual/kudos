# Local setup
1. Install Docker (use [Docker for Mac](https://docs.docker.com/docker-for-mac/) if you're on a Mac).
1. Copy `docker-compose.override.yml.example` to `docker-compose.override.yml` and fill in any placeholder settings.
1. Run `./quickstart.sh`. (The file has step-by-step descriptions if you'd rather run it yourself.)
1. Go to [http://localhost:3000/](http://localhost:3000/) to visit Kudos!

## Startup problems
### There is a server already running
Delete the `tmp/pids/server.pid` file. This is because of an improper shutdown.

### The port is already taken
Either change the port (in `docker-compose.override.yml`) or make sure you don't have anything running on port 3000. Try running a `docker ps` to see if you have any containers forwarded to port 3000, then `docker kill [CID]` to remove them.

### "Couldn't find User with 'id'=1"
You have a stale cookie. Remove the `_kudos_session` cookie from the domain name you're accessing.

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
