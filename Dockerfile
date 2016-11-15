FROM ruby:2.3

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile /usr/src/app
COPY Gemfile.lock /usr/src/app

# Throw errors if Gemfile has been modified since Gemfile.lock, but still
# allow us to run `bundle install` when the container is running.
RUN bundle config --global frozen 1
RUN bundle install
RUN bundle config --global frozen 0

RUN apt-get update
RUN apt-get install -y nodejs
