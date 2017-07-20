'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

module.exports.getDrinksForBarLocation = (event, context, callback) => {
    const barLocation = event.pathParameters.barLocation;

    if (!barLocation) {
        callback(new Error('[400] No bar location specified'));
        return;
    }

    tinyRebelWebScraper
        .getAllDrinks(barLocation)
        .then(drinks => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    drinks,
                    total: drinks.length
                })
            };

            callback(null, response);
        })
        .catch(error => {
            console.error(error);

            callback(new Error('[500] Unable to load drinks'));
        });
};

module.exports.getDrinksForAllLocations = (event, context, callback) => {
    Promise.all([
        tinyRebelWebScraper.getAllDrinks('cardiff'),
        tinyRebelWebScraper.getAllDrinks('newport')
    ])
        .then(([cardiffDrinks, newportDrinks]) => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    cardiff: {
                        drinks: cardiffDrinks,
                        total: cardiffDrinks.length
                    },
                    newport: {
                        drinks: newportDrinks,
                        total: newportDrinks.length
                    }
                })
            };

            callback(null, response);
        })
        .catch(error => {
            console.error(error);

            callback(new Error('[500] Unable to load drinks'));
        });
};
