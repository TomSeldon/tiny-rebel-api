'use strict';

const launchMessages = require('../messages/launch');

module.exports = function() {
    this.emit(':ask', launchMessages.speech, launchMessages.repromptSpeech);
};
