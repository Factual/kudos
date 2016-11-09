FROM ruby:2.3-onbuild

RUN apt-get update
RUN apt-get install -y nodejs
