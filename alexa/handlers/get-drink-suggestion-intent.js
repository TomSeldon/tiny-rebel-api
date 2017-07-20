'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

const sentanceStarters = ['How about trying', 'You might like', 'Why not try'];

module.exports = function() {
    const barLocationSlot = 'BarLocation';
    const intent = this.event.request.intent;
    const hasSpecifiedBarLocation = Boolean(
        intent.slots[barLocationSlot].value
    );

    if (!hasSpecifiedBarLocation) {
        const speechOutput = 'Which bar would you like me to check?';
        const repromptSpeech =
            'Please say <emphasis level="moderate">Cardiff</emphasis> ' +
            'or <emphasis level="moderate">Newport.</emphasis>';
        const updatedIntent = intent;

        this.emit(
            ':elicitSlot',
            barLocationSlot,
            speechOutput,
            repromptSpeech,
            updatedIntent
        );
    } else {
        const barLocation = intent.slots[barLocationSlot].value;

        tinyRebelWebScraper
            .getAllDrinks(barLocation.toLowerCase())
            .then(drinks => {
                const drink = drinks[Math.floor(Math.random() * drinks.length)];
                const sentanceStarter =
                    sentanceStarters[
                        Math.floor(Math.random() * sentanceStarters.length)
                    ];

                /*
                    Output something like:

                    > You might like "Juicy", which is a 4.8% Pale Ale and costs £3.30 for a pint
                 */
                this.emit(
                    ':tell',
                    `${sentanceStarter} <emphasis level="moderate">${drink.name}</emphasis>, ` +
                        `which is a ${drink.formattedAbv} ${drink.style} and costs ` +
                        `${drink.formattedPrice} for a ${drink.quantity}`
                );
            })
            .catch(error => {
                console.error(error);

                this.emit(
                    ':tell',
                    'Sorry, I was unable to get beer information. Please try again later',
                    'Unable to get beer information'
                );
            });
    }
};
