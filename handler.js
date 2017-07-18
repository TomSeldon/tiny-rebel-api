'use strict';

const tinyRebelWebScraper = require('tiny-rebel-web-scraper');

module.exports.getDrinks = (event, context, callback) => {
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
            console.log(error);

            callback(new Error('[500] Unable to load drinks'));
        });
};
