#!/bin/sh

set -u
set -e

npm install -g serverless@$SERVERLESS_FRAMEWORK_VERSION

echo "Testing Alexa Skill"
cd ./alexa
npm test

cd ../

echo "Testing API"
cd ./api
npm test
