#!/bin/sh

set -u
set -e

echo "Testing Alexa Skill"
cd ./alexa
npm test

cd ../

echo "Testing API"
cd ./api
npm test
