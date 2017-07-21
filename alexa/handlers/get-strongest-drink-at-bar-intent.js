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
        const speechOutput = 'Would you like me to check Cardiff or Newport?';
        const repromptSpeech = speechOutput;
        const updatedIntent = intent;

        return this.emit(
            ':elicitSlot',
            barLocationSlot,
            speechOutput,
            repromptSpeech,
            updatedIntent
        );
    }

    const barLocation = intent.slots[barLocationSlot].value;

    tinyRebelWebScraper
        .getAllDrinks(barLocation.toLowerCase())
        .then(drinks => {
            const strongestBeer = drinks.reduce((previous, current) => {
                return previous.abv < current.abv ? current : previous;
            });

            const drinkName = abbreviateSpeech(strongestBeer.name);
            const drinkStyle = abbreviateSpeech(strongestBeer.style);

            this.emit(
                ':tell',
                `The strongest drink on tap at Tiny Rebel ${barLocation} is ` +
                    `<emphasis level="moderate">${drinkName}</emphasis>, ` +
                    `which is a ${strongestBeer.formattedAbv} ${drinkStyle} and costs ` +
                    `${strongestBeer.formattedPrice} for a ${strongestBeer.quantity}`
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
};
