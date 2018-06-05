FROM ruby:2.3

# Install node, s3cmd, postgresql-client
RUN echo 'deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main' > /etc/apt/sources.list.d/pgdg.list
RUN echo 'deb http://security.debian.org/debian-security jessie/updates main' > /etc/apt/sources.list.d/updates.list
RUN curl -s https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs build-essential s3cmd postgresql-client-9.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile /usr/src/app
COPY Gemfile.lock /usr/src/app

# Throw errors if Gemfile has been modified since Gemfile.lock, but still
# allow us to run `bundle install` when the container is running.
RUN bundle config --global frozen 1
RUN bundle install
RUN bundle config --global frozen 0

COPY . /usr/src/app

RUN npm install
