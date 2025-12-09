#!/usr/bin/bash

npm run build

export ORIGIN=http://localhost
export HOST=127.0.0.1
export PORT=4173

node build
