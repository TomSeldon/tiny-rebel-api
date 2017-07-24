'use strict';

const launchMessages = require('./launch');

const message = `<p>I'm sorry, I don't know how to do that.</p> ${launchMessages.speech}`;

exports.speech = message;
exports.repromptSpeech = message;
