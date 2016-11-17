#!/bin/bash

rm -f app/assets/webpack/*
npm run build:client

foreman start -f Procfile.prod
