'use strict';

const Alexa = require('alexa-sdk');

const handlers = {
    GetCheapestDrinkAtBarIntent: require('./handlers/get-cheapest-drink-at-bar-intent'),
    GetStrongestDrinkAtBarIntent: require('./handlers/get-strongest-drink-at-bar-intent'),
    GetDrinkSuggestionIntent: require('./handlers/get-drink-suggestion-intent'),
    LaunchRequest: require('./handlers/launch-request'),
    'AMAZON.HelpIntent': require('./handlers/help-intent'),
    'AMAZON.CancelIntent': require('./handlers/exit-handler'),
    'AMAZON.StopIntent': require('./handlers/exit-handler'),
    Unhandled: require('./handlers/unhandled-intent')
};

module.exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);

    alexa.APP_ID = 'amzn1.ask.skill.01627d10-ac12-4e6b-a88c-c435af291e74';

    alexa.registerHandlers(handlers);
    alexa.execute();
};
