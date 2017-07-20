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
        const repromptSpeech = 'Please say Cardiff or Newport.';
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
                const cheapestBeer = drinks.reduce((previous, current) => {
                    return previous.price < current.price ? previous : current;
                });

                this.emit(
                    ':tell',
                    `The cheapest drink on tap at Tiny Rebel ${barLocation} is ${cheapestBeer.name}, which is ${cheapestBeer.formattedPrice}`
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
