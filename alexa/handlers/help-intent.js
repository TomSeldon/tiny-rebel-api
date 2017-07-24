'use strict';

module.exports = function() {
    const speech =
        '<p>Tiny Rebel are a brewery based in South Wales, with bars in both Newport, and Cardiff.</p>' +
        '<p>I can provide you with information about what drinks are currently on tap in these locations</p>' +
        '<p>For example, you can ask me to suggest a drink that is available in the Cardiff bar, ' +
        'ask me to find the cheapest drink in the Newport bar, or find out ' +
        'what the strongest drink is in the Cardiff bar.</p>' +
        '<p>What would you like me to do?</p>';

    const repromptSpeech = speech;

    this.emit(':ask', speech, repromptSpeech);
};
