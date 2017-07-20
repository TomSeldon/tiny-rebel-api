#!/bin/sh

set -u
set -e

# Run through each local invocation to check exit code is 0.
# This doesn't guard against everything, but at least catches issues where
# the functions are broken.

echo "\n\nTesting: Get drinks in Cardiff"
npm run invoke-local-get-drinks-cardiff

echo "\n\nTesting: Get drinks in Newport"
npm run invoke-local-get-drinks-newport

echo "\n\nTesting: Get drinks from all bars"
npm run invoke-local-get-drinks-all
