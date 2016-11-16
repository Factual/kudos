#!/bin/bash

# Build the web image (this includes doing a bundle install and npm install)
docker-compose build

# Start Postgres
docker-compose up -d db

# Create and migrate dev and test databases in Postgres
docker-compose run web rails db:create
docker-compose run web rails db:migrate

# Start the server!
docker-compose up
