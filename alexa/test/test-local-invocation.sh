#!/bin/sh

set -u
set -e

# Run through each local invocation to check exit code is 0.
# This doesn't guard against everything, but at least catches issues where
# the function is broken.

echo "\n\nTesting: Launch request"
npm run invoke-local-launch-request

echo "\n\nTesting: Help"
npm run invoke-local-help

echo "\n\nTesting: Unhandled"
npm run invoke-local-unhandled-intent

echo "\n\nTesting: Get cheapest drink"
npm run invoke-local-get-cheapest
npm run invoke-local-get-cheapest-no-bar

echo "\n\nTesting: Get strongest drink"
npm run invoke-local-get-strongest
npm run invoke-local-get-strongest-no-bar

echo "\n\nTesting: Suggest a drink"
npm run invoke-local-suggest-drink
npm run invoke-local-suggest-drink-no-bar
