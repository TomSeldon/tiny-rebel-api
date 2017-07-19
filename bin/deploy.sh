#!/bin/sh

set -e
set -u

npm install -g serverless@1.17.0

serverless deploy
