#!/bin/sh

set -e
set -u

npm install -g serverless@1.17.0

echo "Deploying Alexa skill"
cd alexa
serverless deploy --verbose

echo "Deploying API"
cd ../api
serverless deploy --verbose
