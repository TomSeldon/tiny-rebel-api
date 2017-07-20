'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

module.exports = function() {
    const barLocation = this.event.request.intent.slots.BarLocation.value;

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
};
