'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

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
                const strongestBeer = drinks.reduce((previous, current) => {
                    return previous.abv < current.abv ? current : previous;
                });

                this.emit(
                    ':tell',
                    `The strongest drink on tap at Tiny Rebel ${barLocation} is ` +
                        `<emphasis level="moderate">${strongestBeer.name}</emphasis>, ` +
                        `which is ${strongestBeer.formattedAbv}`
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
