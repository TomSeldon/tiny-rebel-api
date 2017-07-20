'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

module.exports = function() {
    const barLocation = this.event.request.intent.slots.BarLocation.value;

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
