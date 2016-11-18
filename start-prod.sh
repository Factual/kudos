#!/bin/bash

bundle exec rails assets:precompile
foreman start -f Procfile.prod
