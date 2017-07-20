#!/bin/sh

set -e
set -u

npm install -g serverless@$SERVERLESS_FRAMEWORK_VERSION

echo "Deploying Alexa skill"
cd alexa
serverless deploy --verbose

echo "Deploying API"
cd ../api
serverless deploy --verbose
