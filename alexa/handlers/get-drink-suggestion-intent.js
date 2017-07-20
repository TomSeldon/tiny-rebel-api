'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

module.exports = function() {
    const barLocation = this.event.request.intent.slots.BarLocation.value;

    if (!barLocation) {
        this.emit(
            ':tell',
            `Sorry, I can't answer that unless you tell me which location you'd like a suggestion for. ` +
                `Please ask again, but specify if you want a suggestion for Cardiff or Newport.`,
            'You need to specify a bar location. Ask again, specifying either Cardiff or Newport.'
        );
        return;
    }

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
};
