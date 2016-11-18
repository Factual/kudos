#!/bin/bash

# Build the web image (this includes doing a bundle install and npm install)
docker-compose build

# Start Postgres (and wait for it to actually start)
docker-compose up -d db
sleep 15

# Create and migrate dev and test databases in Postgres
docker-compose run web rails db:create
docker-compose run web rails db:migrate

# Install NPM modules
# Because modules are stored in the local `node_modules` folder and that folder
# is shadowed by our mounted volume, we need to run this again.
docker-compose run web npm install

# Start the server!
docker-compose up
