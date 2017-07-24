'use strict';

const unhandledMessages = require('../messages/unhandled');

module.exports = function() {
    this.emit(
        ':ask',
        unhandledMessages.speech,
        unhandledMessages.repromptSpeech
    );
};
