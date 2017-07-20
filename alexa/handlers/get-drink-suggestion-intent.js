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
                const drink = drinks[Math.floor(Math.random() * drinks.length)];

                this.emit(
                    ':tell',
                    `How about trying ${drink.name}, which is a ${drink.formattedAbv} ${drink.style} and costs ${drink.formattedPrice} for a ${drink.quantity}`
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
