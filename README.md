# Tiny Rebel API

> A HTTP JSON API for returning beer information about Tiny Rebel bars

This uses the [serverless framework](https://serverless.com) to deploy a Lambda function to AWS, exposed via AWS API Gateway.

## Usage:

`GET $SERVER/{barLocation}/beers`

Where `$SERVER` is the location where this is deployed, and `{barLocation}` is a supported bar location, i.e. `cardiff` or `newport`.
