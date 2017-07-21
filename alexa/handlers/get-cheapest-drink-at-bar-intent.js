'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

const abbreviateSpeech = require('../util/abbreviate-speech');

module.exports = function() {
    const barLocationSlot = 'BarLocation';
    const intent = this.event.request.intent;
    const hasSpecifiedBarLocation = Boolean(
        intent.slots[barLocationSlot].value
    );

    if (!hasSpecifiedBarLocation) {
        const speechOutput =
            'Which bar would you like me to check? I can check at either Cardiff or Newport.';
        const repromptSpeech = speechOutput;
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
                const drinkName = abbreviateSpeech(cheapestBeer.name);
                const drinkStyle = abbreviateSpeech(cheapestBeer.style);

                this.emit(
                    ':tell',
                    `The cheapest drink on tap at Tiny Rebel ${barLocation} is ` +
                        `<emphasis level="moderate">${drinkName}</emphasis>, ` +
                        `which is a ${cheapestBeer.formattedAbv} ${drinkStyle} and costs ` +
                        `${cheapestBeer.formattedPrice} for a ${cheapestBeer.quantity}`
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
