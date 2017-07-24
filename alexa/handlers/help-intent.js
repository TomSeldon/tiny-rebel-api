'use strict';

const helpMessages = require('../messages/help');

module.exports = function() {
    this.emit(':ask', helpMessages.speech, helpMessages.repromptSpeech);
};
