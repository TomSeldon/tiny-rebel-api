'use strict';

const Alexa = require('alexa-sdk');

const handlers = {
    GetCheapestDrinkAtBarIntent: require('./handlers/get-cheapest-drink-at-bar-intent'),
    GetStrongestDrinkAtBarIntent: require('./handlers/get-strongest-drink-at-bar-intent'),
    GetDrinkSuggestionIntent: require('./handlers/get-drink-suggestion-intent'),
    LaunchRequest: require('./handlers/launch-request')
};

module.exports.handler = (event, context, callbaxck) => {
    const alexa = Alexa.handler(event, context);

    alexa.registerHandlers(handlers);
    alexa.execute();
};
