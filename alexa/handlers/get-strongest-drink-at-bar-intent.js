'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

module.exports = function() {
    const barLocation = this.event.request.intent.slots.BarLocation.value;

    if (!barLocation) {
        this.emit(
            ':tell',
            `Sorry, I can't answer that unless you tell me which location you'd like me to check. ` +
                `Please ask again, but specify if you want me to check in Cardiff or Newport.`,
            'You need to specify a bar location. Ask again, specifying either Cardiff or Newport.'
        );
        return;
    }

    tinyRebelWebScraper
        .getAllDrinks(barLocation.toLowerCase())
        .then(drinks => {
            const strongestBeer = drinks.reduce((previous, current) => {
                return previous.abv < current.abv ? current : previous;
            });

            this.emit(
                ':tell',
                `The strongest drink on tap at Tiny Rebel ${barLocation} is ${strongestBeer.name}, which is ${strongestBeer.formattedAbv}`
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
